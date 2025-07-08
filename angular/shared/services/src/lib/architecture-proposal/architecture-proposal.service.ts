import {
  Injectable,
  Inject,
  InjectionToken,
  inject,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  from,
  map,
  switchMap,
  catchError,
  of,
  throwError,
  shareReplay,
  Observable,
} from 'rxjs';
import mermaid from 'mermaid';

import { ArchitectureProposal } from '@ease/interfaces';
import { ArchitecturePropsalDto } from '@ease/dto';
import { FirebaseOptions } from 'firebase/app';
import { FirestoreService } from '../firestore/firestore.service';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';

export interface AppEnvironment {
  apiUrl: string;
  firebaseConfig: FirebaseOptions;
}

export const APP_ENVIRONMENT = new InjectionToken<AppEnvironment>(
  'app.environment'
);

@Injectable({
  providedIn: 'root',
})
export class ArchitectureProposalService extends FirestoreService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);
  private firebaseAuth = inject(FirebaseAuthService);
  private readonly ARCHITECTURE_CACHE_KEY = 'cachedArchitectureProposal';
  private readonly apiUrl: string;
  collectionName = 'archiectureProposal';

  // Toggle this manually or replace with Angular's isDevMode() if needed
  isDevMode = false;

  idToken = signal('');

  constructor(@Inject(APP_ENVIRONMENT) private env: AppEnvironment) {
    super();
    this.apiUrl = env.apiUrl;

    const user = this.firebaseAuth.getCurrentUser();
    if (user) {
      user.getIdToken().then((token) => {
        console.log(token);
        this.idToken.set(token);
      });
    }
  }

  deleteArchitectureProposal(
    id: string,
    intakeId: string
  ): Observable<{
    success: boolean;
    message: string;
    intakeId: string;
    id: string;
  } | null> {
    const user = this.firebaseAuth.getCurrentUser();
    if (!user) {
      return throwError(() => new Error('User not authenticated'));
    }

    return from(user.getIdToken()).pipe(
      switchMap((token) =>
        this.http.delete<{
          success: boolean;
          message: string;
          intakeId: string;
          id: string;
        }>(`${this.apiUrl}/architecture/proposal/${id}`, {
          params: { intakeId },
          headers: { Authorization: `Bearer ${token}` },
        })
      ),
      catchError((err) =>
        this.handleError('fetching architecture proposal', err)
      )
    );
  }

  getArchitectureProposal(id: string): Observable<ArchitectureProposal> {
    const user = this.firebaseAuth.getCurrentUser();
    if (!user) {
      return throwError(() => new Error('User not authenticated'));
    }

    return from(user.getIdToken()).pipe(
      switchMap((token) =>
        this.http.get<ArchitectureProposal>(
          `${this.apiUrl}/architecture/proposal/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ),
      switchMap((proposal) =>
        this.renderMermaidDiagram(proposal).pipe(map(() => proposal))
      ),
      catchError((err) =>
        this.handleError('fetching architecture proposal', err)
      )
    );
  }

  /**
   * Create and optionally render the architecture proposal diagram.
   * Uses localStorage cache in dev mode.
   */
  createArchitectureProposal(
    dto: ArchitecturePropsalDto
  ): Observable<ArchitectureProposal> {
    if (this.isDevMode) {
      const cached = localStorage.getItem(this.ARCHITECTURE_CACHE_KEY);
      if (cached) {
        try {
          const parsed: ArchitectureProposal = JSON.parse(cached);
          const mermaidCode = parsed.diagram.mermaid as string;

          if (mermaidCode.trim().startsWith('<svg')) {
            // Cached version is already an SVG, re-sanitize only
            parsed.diagram.mermaid =
              this.sanitizer.bypassSecurityTrustHtml(mermaidCode);
            return of(parsed);
          } else {
            // Re-render if it's raw Mermaid code
            return this.renderMermaidDiagram(parsed).pipe(map(() => parsed));
          }
        } catch (e) {
          console.warn('Invalid cached data, ignoring.');
        }
      }
    }

    const url = `${this.apiUrl}/architecture/proposal`;

    return this.http
      .post<ArchitectureProposal>(
        url,
        { dto },
        { headers: { Authorization: `Bearer ${this.idToken()}` } }
      )
      .pipe(
        switchMap((proposal) =>
          this.renderMermaidDiagram(proposal).pipe(
            map(() => {
              // Cache if in dev mode
              if (this.isDevMode) {
                try {
                  const proposalCopy = {
                    ...proposal,
                    diagram: {
                      ...proposal.diagram,
                      // Store raw SVG string in cache
                      mermaid: proposal.diagram.mermaid?.toString(),
                    },
                  };
                  localStorage.setItem(
                    this.ARCHITECTURE_CACHE_KEY,
                    JSON.stringify(proposalCopy)
                  );
                } catch (e) {
                  console.warn('Failed to cache proposal:', e);
                }
              }

              return proposal;
            })
          )
        ),
        shareReplay(1),
        catchError((err) =>
          this.handleError('creating architecture proposal', err)
        )
      );
  }

  /**
   * Renders the Mermaid diagram and sanitizes the SVG.
   */
  private renderMermaidDiagram(
    proposal: ArchitectureProposal
  ): Observable<void> {
    const mermaidCode = proposal.diagram.mermaid as string;

    return from(mermaid.render('architectureDiagram', mermaidCode)).pipe(
      map((res) => {
        proposal.diagram.mermaid = this.sanitizer.bypassSecurityTrustHtml(
          res.svg
        );
      }),
      catchError((err) => {
        console.error('Mermaid rendering failed:', err);
        return of(undefined);
      })
    );
  }

  /**
   * Handles and logs errors consistently.
   */
  private handleError(context: string, error: unknown): Observable<never> {
    console.error(`Error while ${context}:`, error);
    return throwError(() => new Error(`Failed while ${context}`));
  }
}
