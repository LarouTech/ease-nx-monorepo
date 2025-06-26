import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  WritableSignal,
  type OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intake, IntakeService } from '@ease-angular/services';
import {
  AccordionComponent,
  ButtonComponent,
  FormfieldComponent,
  LobbySubPageLayoutComponent,
} from '@ease-angular/ui';
import { intakeSections, IntakeSection } from './intake-sections.const';

@Component({
  selector: 'app-intakes-edit',
  imports: [
    CommonModule,
    LobbySubPageLayoutComponent,
    AccordionComponent,
    FormfieldComponent,
    ButtonComponent,
  ],
  templateUrl: './intakes-edit.component.html',
  styleUrl: './intakes-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private intakeService = inject(IntakeService);

  private intakeId!: string;

  test = new Array(150);

  intake_: WritableSignal<Intake | null> = signal(null);
  sections: IntakeSection[] = [];

  async ngOnInit() {
    this.route.params.subscribe((param) => (this.intakeId = param['id']));
    this.intake_.set(await this.intakeService.getIntake(this.intakeId));
    const intakeValue = this.intake_();

    if (intakeValue) {
      this.sections = intakeSections(intakeValue);
    } else {
      this.sections = [];
    }

    console.log(this.intake_());
  }
}
