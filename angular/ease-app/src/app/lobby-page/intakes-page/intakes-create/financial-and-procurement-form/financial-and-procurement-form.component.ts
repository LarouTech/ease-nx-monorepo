import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
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
} from '@ease-angular/ui';

@Component({
  selector: 'financial-and-procurement-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormfieldComponent,
    SelectInputComponent,
    FormfieldComponent,
    CheckboxGroupComponent,
    FormCardComponent,
  ],
  templateUrl: './financial-and-procurement-form.component.html',
  styleUrl: './financial-and-procurement-form.component.css',
})
export class FinancialAndProcurementFormComponent implements OnInit {
  finacialAndProcurmentForm!: FormGroup;

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  formName = 'financialAndProcurement';

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
  }
  private initializeForm() {
    this.finacialAndProcurmentForm = new FormGroup({
      isFundingSecured: new FormControl('', Validators.required),
      estimatedTotalBudget: new FormControl('', Validators.required),
      fundingSource: new FormControl('', Validators.required),
      licenseOrCloudServicesNeeded: new FormControl('', Validators.required),
      procurementType: new FormControl('', Validators.required),
      hasProcurementVehicleIdentified: new FormControl('', Validators.required),
      expectedProcurementTimeline: new FormControl('', Validators.required),
      isCostEstimationSupportRequire: new FormControl('', Validators.required),
    });
  }
}
