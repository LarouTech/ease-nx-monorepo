import { ArchitectureProposal } from '@ease/interfaces';
import { environment } from './../../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LobbySubPageLayoutComponent } from '@ease-angular/ui';
import mermaid from 'mermaid';
import { FICTIONAL_INTAKEFORM } from '@ease-angular/services';
import { from, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { IntakeDto } from '@ease/dto';

@Component({
  selector: 'app-cost-estimator',
  imports: [CommonModule, LobbySubPageLayoutComponent],
  templateUrl: './cost-estimator.component.html',
  styleUrl: './cost-estimator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostEstimatorComponent implements OnInit {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  architectureProposal$?: Observable<ArchitectureProposal>;

  isDevMode = true;

  ngOnInit() {
    this.architectureProposal$ = this.getArchitectureProposal().pipe(
      tap((d) => console.log(d))
    );
  }

  private readonly ARCHITECTURE_CACHE_KEY = 'cachedArchitectureProposal';

  private getArchitectureProposal(
    intake: IntakeDto = FICTIONAL_INTAKEFORM
  ): Observable<ArchitectureProposal> {
    if (!this.architectureProposal$) {
      const cached = localStorage.getItem(this.ARCHITECTURE_CACHE_KEY);

      if (cached && this.isDevMode) {
        // Rehydrate from storage and re-apply bypassSecurityTrustHtml
        const parsed: ArchitectureProposal = JSON.parse(cached);
        parsed.diagram.mermaid = this.sanitizer.bypassSecurityTrustHtml(
          parsed.diagram.mermaid as string
        );
        this.architectureProposal$ = of(parsed);
      } else {
        this.architectureProposal$ = this.http
          .post<ArchitectureProposal>(
            `${environment.apiUrl}/architecture/proposal`,
            {
              intake: this.isDevMode ? FICTIONAL_INTAKEFORM : intake,
              platform: 'azure',
            }
          )
          .pipe(
            switchMap((proposal) => {
              return from(
                mermaid.render(
                  'architectureProposal',
                  proposal.diagram.mermaid as string
                )
              ).pipe(
                map((res) => {
                  // Cache raw SVG string in localStorage
                  const rawProposal = {
                    ...proposal,
                    diagram: {
                      ...proposal.diagram,
                      mermaid: res.svg,
                    },
                  };
                  localStorage.setItem(
                    this.ARCHITECTURE_CACHE_KEY,
                    JSON.stringify(rawProposal)
                  );

                  // Return version with SafeHtml for rendering
                  proposal.diagram.mermaid =
                    this.sanitizer.bypassSecurityTrustHtml(res.svg);
                  return proposal;
                })
              );
            }),
            shareReplay(1)
          );
      }
    }

    return this.architectureProposal$;
  }
}
