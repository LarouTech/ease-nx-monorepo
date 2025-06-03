import { RequestorInformationFormComponent } from './requestor-information-form/requestor-information-form.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent, LobbySubPageLayoutComponent } from '@ease-angular/ui';
import { BusinessContextComponent } from './business-context/business-context.component';
import { ProjectDetailsFormComponent } from './project-details-form/project-details-form.component';
import { TechnicalConsiderationsFormComponent } from './technical-considerations-form/technical-considerations-form.component';
import { DataAndSecurityFormComponent } from './data-and-security-form/data-and-security-form.component';
import { FinancialAndProcurementFormComponent } from './financial-and-procurement-form/financial-and-procurement-form.component';
import { INTAKE_FORM_SIDE_CONTROLS_PROPS } from './intake-form-side-controls/intake-form-side-controls.props';
import { IntakeFormSideControlsComponent } from './intake-form-side-controls/intake-form-side-controls.component';
import { TimelineAndDeliveryComponent } from './timeline-and-delivery/timeline-and-delivery.component';
import { DependenciesAndApprovalsFormComponent } from './dependencies-and-approvals-form/dependencies-and-approvals-form.component';

@Component({
  selector: 'app-intakes-create',
  imports: [
    CommonModule,
    LobbySubPageLayoutComponent,
    ReactiveFormsModule,
    RequestorInformationFormComponent,
    BusinessContextComponent,
    ProjectDetailsFormComponent,
    TechnicalConsiderationsFormComponent,
    DataAndSecurityFormComponent,
    FinancialAndProcurementFormComponent,
    IntakeFormSideControlsComponent,
    TimelineAndDeliveryComponent,
    DependenciesAndApprovalsFormComponent,
  ],
  templateUrl: './intakes-create.component.html',
  styleUrl: './intakes-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesCreateComponent implements OnInit {
  intakeForm!: FormGroup;
  formSections = INTAKE_FORM_SIDE_CONTROLS_PROPS;

  ngOnInit() {
    this.intakeForm = new FormGroup({
      requestorInformation: new FormArray([], Validators.required),
      businessContext: new FormArray([], Validators.required),
      technicalConsiderations: new FormArray([], Validators.required),
      dataAndSecurity: new FormArray([], Validators.required),
      financialAndProcurement: new FormArray([], Validators.required),
      dependenciesAndApprovals: new FormArray([], Validators.required),
    });
  }

  onFormUpdate(formGroup: FormGroup, formName: string) {
    this.intakeForm.setControl(formName, formGroup);
  }

  onSubmit() {
    if (this.intakeForm.valid) {
      console.log('Form Submitted:', this.intakeForm.value);
      // Add your submission logic here
    } else {
      console.log('Form is invalid');
    }
  }
}
