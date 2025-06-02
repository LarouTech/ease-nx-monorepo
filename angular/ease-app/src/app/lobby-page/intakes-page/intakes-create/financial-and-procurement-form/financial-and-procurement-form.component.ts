import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CheckboxGroupComponent,
  FormfieldComponent,
  SelectInputComponent,
  SvgIconComponent,
  TextaeraInputComponent,
} from '@ease-angular/ui';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'financial-and-procurement-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormfieldComponent,
    SvgIconComponent,
    SelectInputComponent,
    TextaeraInputComponent,
    FormfieldComponent,
    CheckboxGroupComponent,
  ],
  templateUrl: './financial-and-procurement-form.component.html',
  styleUrl: './financial-and-procurement-form.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // When element is added
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // When element is removed
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FinancialAndProcurementFormComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  finacialAndProcurmentForm!: FormGroup;

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  formName = 'financialAndProcurement';

  ngOnInit() {
    this.initializeForm();
    this.formChangeEmitter();
  }

  private formChangeEmitter() {
    this.finacialAndProcurmentForm.valueChanges
      .pipe(
        debounceTime(1000), // wait 300ms after last change
        distinctUntilChanged(), // only emit if value actually changes
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe((d) => {
        this.formChangEvent.emit(this.finacialAndProcurmentForm);
      });
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
