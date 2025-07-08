import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArchitectureProposalService } from '@ease-angular/services';
import {
  AccordionComponent,
  LobbySubPageLayoutComponent,
  SnackbarService,
  SvgIconComponent,
} from '@ease-angular/ui';
import { ArchitectureDiagramComponent } from './architecture-diagram/architecture-diagram.component';
import { CommonModule } from '@angular/common';
import { delay, Observable, switchMap } from 'rxjs';
import { ArchitectureProposal } from '@ease/interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-archiecture-proposal',
  imports: [
    CommonModule,
    LobbySubPageLayoutComponent,
    ArchitectureDiagramComponent,
    SvgIconComponent,
    AccordionComponent,
  ],
  templateUrl: './view-archiecture-proposal.component.html',
  styleUrl: './view-archiecture-proposal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewArchiectureProposalComponent implements OnInit {
  private archietcureProposal = inject(ArchitectureProposalService);
  private snackbar = inject(SnackbarService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef$ = inject(DestroyRef);

  proposalId = signal<string>('');
  architectureProposal$?: Observable<ArchitectureProposal>;

  isLoading_ = signal(false);

  ngOnInit() {
    this.route.params.subscribe((params) => this.proposalId.set(params['id']));
    this.architectureProposal$ = this.getArchiecturePorposal();
  }

  getArchiecturePorposal(): Observable<ArchitectureProposal> | undefined {
    const id = this.proposalId();
    if (id == null) {
      return undefined;
    }
    return this.archietcureProposal.getArchitectureProposal(id);
  }

  onDeleteArchiectureProposal() {
    this.isLoading_.set(true);
    const id = this.proposalId();

    this.architectureProposal$
      ?.pipe(
        delay(3000),
        switchMap((proposal) => {
          console.log(proposal);
          if (!proposal.intakeId) {
            throw new Error('intakeId is undefined');
          }
          return this.archietcureProposal.deleteArchitectureProposal(
            id,
            proposal.intakeId
          );
        }),
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe({
        next: (res) => {
          this.isLoading_.set(false);
          this.snackbar.show({
            message: res?.message ?? '',
            type: 'success',
            color: '#ffffff',
          });
          this.router.navigate(['/', 'lobby', 'intakes', res?.intakeId]);
        },
        error: (err) => {
          this.isLoading_.set(false);
          this.snackbar.show({ type: 'error', message: err.message });
        },
      });
  }
}
