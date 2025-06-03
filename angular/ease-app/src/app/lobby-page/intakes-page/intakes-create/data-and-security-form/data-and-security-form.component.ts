import { CommonModule } from '@angular/common';
import { Component, input, output, type OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CheckboxGroupComponent,
  FormCardComponent,
  SelectInputComponent,
} from '@ease-angular/ui';

@Component({
  selector: 'data-and-security-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckboxGroupComponent,
    SelectInputComponent,
    FormCardComponent,
  ],
  templateUrl: './data-and-security-form.component.html',
  styleUrl: './data-and-security-form.component.css',
})
export class DataAndSecurityFormComponent implements OnInit {
  dataAndSecurityForm!: FormGroup;

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  formName = 'dataAndSecurity';

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
  }

  private initializeForm() {
    this.dataAndSecurityForm = new FormGroup({
      dataTypeStored: new FormControl('', Validators.required),
      isPersonalInformationInvolved: new FormControl('', Validators.required),
      isDataStoreOrTransmitExternally: new FormControl('', Validators.required),
      dataStorageLocation: new FormControl('', Validators.required),
      isEncryptionAtRest: new FormControl('', Validators.required),
      isEncryptionInTransit: new FormControl('', Validators.required),
      complianceRequirements: new FormControl('', Validators.required),
      isSecurityThreatAndRiskAssessment: new FormControl(
        '',
        Validators.required
      ),
      isRemoteAccessRequire: new FormControl('', Validators.required),
    });
  }
}
