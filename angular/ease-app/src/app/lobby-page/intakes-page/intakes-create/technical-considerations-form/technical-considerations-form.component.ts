import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
  type OnInit,
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
  selector: 'technical-considerations-form',
  imports: [
    FormfieldComponent,
    ReactiveFormsModule,
    SvgIconComponent,
    SelectInputComponent,
    TextaeraInputComponent,
    CheckboxGroupComponent,
  ],
  templateUrl: './technical-considerations-form.component.html',
  styleUrl: './technical-considerations-form.component.css',
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
export class TechnicalConsiderationsFormComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  technicalConsiderationsForm!: FormGroup;

  formName = 'technicalConsiderations';

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.initializeForm();
    this.formChangeEmitter();
  }

  private formChangeEmitter() {
    this.technicalConsiderationsForm.valueChanges
      .pipe(
        debounceTime(1000), // wait 300ms after last change
        distinctUntilChanged(), // only emit if value actually changes
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe(() => {
        this.formChangEvent.emit(this.technicalConsiderationsForm);
      });
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
