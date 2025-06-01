import { RequestorInformationFormComponent } from './requestor-information-form/requestor-information-form.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LobbySubPageLayoutComponent } from '@ease-angular/ui';
import { BusinessContextComponent } from './business-context/business-context.component';

@Component({
  selector: 'app-intakes-create',
  imports: [
    CommonModule,
    LobbySubPageLayoutComponent,
    ReactiveFormsModule,
    RequestorInformationFormComponent,
    BusinessContextComponent,
  ],
  templateUrl: './intakes-create.component.html',
  styleUrl: './intakes-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesCreateComponent implements OnInit {
  intakeForm!: FormGroup;

  formSections: string[] = [
    'Requestor Information',
    'Business Context',
    'Project Details',
    'Technical Considerations',
    'Data and Security',
    'Financial and Procurement',
    'Timeline and Delivery',
    'Dependencies and Approvals',
    'Additional Information',
  ];

  ngOnInit() {
    this.intakeForm = new FormGroup({});
  }

  onFormUpdate(formGroup: FormGroup, formName: string) {
    this.intakeForm.addControl(formName, formGroup);
  }

  onClickSectionMenuItem(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
