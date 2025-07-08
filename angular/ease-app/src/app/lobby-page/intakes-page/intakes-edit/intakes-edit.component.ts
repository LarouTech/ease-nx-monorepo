import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
  type OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IntakeService } from '@ease-angular/services';
import {
  AccordionComponent,
  FormfieldComponent,
  LobbySubPageLayoutComponent,
  ModalService,
  SvgIconComponent,
} from '@ease-angular/ui';
import { intakeSections, IntakeSection } from './intake-sections.const';
import { IntakeDto } from '@ease/dto';

@Component({
  selector: 'app-intakes-edit',
  imports: [
    CommonModule,
    LobbySubPageLayoutComponent,
    AccordionComponent,
    FormfieldComponent,
    SvgIconComponent,
    FormfieldComponent,
  ],
  templateUrl: './intakes-edit.component.html',
  styleUrl: './intakes-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private intakeService = inject(IntakeService);

  private intakeId!: string;

  intake_: WritableSignal<IntakeDto | null> = signal(null);
  initialIntakeData_: WritableSignal<IntakeDto | null> = signal(null);

  sections = signal<IntakeSection[]>([]);

  async ngOnInit() {
    this.route.params.subscribe((param) => (this.intakeId = param['id']));
    this.intake_.set(await this.intakeService.getIntake(this.intakeId));
    const intakeValue = this.intake_();
    this.initialIntakeData_.set(intakeValue);

    if (intakeValue) {
      this.sections.set(intakeSections(intakeValue));
    } else {
      this.sections.set([]);
    }
  }

  onClosingAccordion(state: boolean, sectionName: string) {
    if (!state) {
      // Set the specific section to not be in edit mode
      this.sections.set(
        this.sections().map((s) => {
          if (s.name === sectionName) {
            s.isEditMode = false;
            s.fields.map((f) => {
              f.isReset = false;
              return f;
            });
          }
          return s;
        })
      );
    } else {
      //edit mode

      this.sections().map((s) => {
        if (s.name === sectionName) {
          s.fields.map((f) => {
            f.isReset = true;
            return f;
          });
        }
        return s;
      });
    }
  }

  onUpdateSection(ev: MouseEvent) {
    ev.stopPropagation();
    console.log('update section');
  }

  onEditSection(ev: MouseEvent, section: IntakeSection) {
    ev.stopPropagation();

    this.sections.set(
      this.sections().map((s) => {
        if (section.name === s.name) {
          s.isEditMode = !s.isEditMode;
        }

        return s;
      })
    );

    // console.log(this.sections());
  }

  onCreateArchitectureProposal() {
    this.router.navigate([
      '/',
      'lobby',
      'architecture-proposals',
      'create',
      this.intakeId,
    ]);
  }

  onNavigateToArchProposal() {
    this.router.navigate([
      '/',
      'lobby',
      'architecture-proposals',
      this.intake_()?.archProposalId,
    ]);
  }
}
