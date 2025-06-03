import {
  Component,
  DestroyRef,
  inject,
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
  CheckboxGroupComponent,
  FormCardComponent,
  FormfieldComponent,
  SelectInputComponent,
  TextaeraInputComponent,
} from '@ease-angular/ui';

@Component({
  selector: 'technical-considerations-form',
  imports: [
    FormfieldComponent,
    ReactiveFormsModule,
    SelectInputComponent,
    TextaeraInputComponent,
    CheckboxGroupComponent,
    FormCardComponent,
  ],
  templateUrl: './technical-considerations-form.component.html',
  styleUrl: './technical-considerations-form.component.css',
})
export class TechnicalConsiderationsFormComponent implements OnInit {
  technicalConsiderationsForm!: FormGroup;

  formName = 'technicalConsiderations';

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
  }

  private initializeForm() {
    this.technicalConsiderationsForm = new FormGroup({
      anticipatedHostingLocation: new FormControl('', Validators.required),
      expectedEnvironments: new FormControl('', Validators.required),
      dataClassificationLevel: new FormControl('', Validators.required),
      integrationRequirements: new FormControl('', Validators.required),
      authenticationAndAuthorizationNeeds: new FormControl(
        '',
        Validators.required
      ),
      authenticationAndAuthorizationNeedsElaborate: new FormControl(''),
      anticipatedVolumeOrLoad: new FormControl('', Validators.required),
      performanceOrAvailibilityRequirements: new FormControl(
        '',
        Validators.required
      ),
      securityConsiderationsOrConstraints: new FormControl(
        '',
        Validators.required
      ),
      disasterRecoveryBusinessContinuityNeeds: new FormControl(
        '',
        Validators.required
      ),
      disasterRecoveryBusinessContinuityNeedsMore: new FormControl(''),
      doesItRequireInternetAccess: new FormControl('', Validators.required),
      dependencyOnLegacySystems: new FormControl('', Validators.required),
      dependencyOnLegacySystemsMore: new FormControl(''),
      estimatedDataStorageRequirements: new FormControl(
        '',
        Validators.required
      ),
      dataStorageUnit: new FormControl('', Validators.required),
    });
  }
}
