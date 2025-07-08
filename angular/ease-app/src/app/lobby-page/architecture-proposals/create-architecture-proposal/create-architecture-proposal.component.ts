import { ActivatedRoute, Route, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  ArchitectureProposalService,
  FirestoreService,
  Intake,
  IntakeService,
} from '@ease-angular/services';
import {
  FullScreenSpinnerComponent,
  LobbySubPageLayoutComponent,
  SelectInputComponent,
  SvgIconComponent,
} from '@ease-angular/ui';
import { ArchitecturePropsalDto, IntakeDto } from '@ease/dto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArchiecturePlatform } from '@ease/types';
import { combineLatest, delay, from, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-architecture-proposal',
  imports: [
    LobbySubPageLayoutComponent,
    SelectInputComponent,
    SvgIconComponent,
    FullScreenSpinnerComponent,
    CommonModule,
  ],
  templateUrl: './create-architecture-proposal.component.html',
  styleUrl: './create-architecture-proposal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArchitectureProposalComponent implements OnInit {
  private archProposalService = inject(ArchitectureProposalService);
  private intakeService = inject(IntakeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef$ = inject(DestroyRef);
  private firestore = inject(FirestoreService);

  private intakeId!: string;
  intake_: WritableSignal<IntakeDto | null> = signal(null);

  platformOptions: { label: string; value: string }[] = [
    { label: 'AWS', value: 'AWS' },
    { label: 'Azure', value: 'Azure' },
    { label: 'GCP', value: 'GCP' },
    { label: 'OnPrem', value: 'OnPrem' },
    { label: 'Hybrid', value: 'Hybrid' },
  ];

  selectOption: WritableSignal<string | null> = signal(null);

  isLoadingProposal = signal(false);

  onSelectOption(value: string) {
    this.selectOption.set(value);
  }

  async ngOnInit() {
    this.route.params.subscribe((param) => (this.intakeId = param['intakeId']));
    this.intake_.set(await this.intakeService.getIntake(this.intakeId));

    console.log(this.intake_());
  }

  onCreateArchitectureProposal() {
    this.isLoadingProposal.set(true);
    const intake = this.intake_();
    if (!intake) {
      this.isLoadingProposal.set(false);
      throw new Error('Intake is not loaded.');
    }
    const dto: ArchitecturePropsalDto = {
      intake: intake,
      platform: this.selectOption() as ArchiecturePlatform,
    };
    this.archProposalService
      .createArchitectureProposal(dto)
      .pipe(
        delay(this.archProposalService.isDevMode ? 3000 : 0),
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe((proposal) => {
        this.isLoadingProposal.set(false);
        console.log(proposal);
        this.router.navigate([
          '/',
          'lobby',
          'architecture-proposals',
          proposal.id,
        ]);
      });
  }
}
