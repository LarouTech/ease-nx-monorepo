import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  type OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  FormCardComponent,
  SelectInputComponent,
  TextaeraInputComponent,
} from '@ease-angular/ui';

@Component({
  selector: 'dependencies-and-approvals-form',
  imports: [
    CommonModule,
    FormCardComponent,
    ReactiveFormsModule,
    SelectInputComponent,
    TextaeraInputComponent,
  ],
  templateUrl: './dependencies-and-approvals-form.component.html',
  styleUrl: './dependencies-and-approvals-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DependenciesAndApprovalsFormComponent implements OnInit {
  dependenciesAndApprovalsForm!: FormGroup;

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  formName = 'dependenciesAndApprovals';

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
  }
  private initializeForm() {
    this.dependenciesAndApprovalsForm = new FormGroup({
      isDependencies: new FormControl('', Validators.required),
      describeDependencies: new FormControl(''),

      isApprovalsPending: new FormControl('', Validators.required),

      describeApprovals: new FormControl(''),
      isAllApprovalsObtained: new FormControl('', Validators.required),
      isGovernanceSupportNeeds: new FormControl('', Validators.required),
      isArchietureReviewCompleted: new FormControl('', Validators.required),
    });
  }
}
