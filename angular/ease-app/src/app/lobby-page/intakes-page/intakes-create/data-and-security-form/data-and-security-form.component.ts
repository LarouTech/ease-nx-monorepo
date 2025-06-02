import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
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
  SelectInputComponent,
  SvgIconComponent,
} from '@ease-angular/ui';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'data-and-security-form',
  imports: [
    SvgIconComponent,
    CommonModule,
    ReactiveFormsModule,
    CheckboxGroupComponent,
    SelectInputComponent,
  ],
  templateUrl: './data-and-security-form.component.html',
  styleUrl: './data-and-security-form.component.css',
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
export class DataAndSecurityFormComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  dataAndSecurityForm!: FormGroup;

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  formName = 'dataAndSecurity';

  ngOnInit() {
    this.initializeForm();
    this.formChangeEmitter();
  }

  private formChangeEmitter() {
    this.dataAndSecurityForm.valueChanges
      .pipe(
        debounceTime(1000), // wait 300ms after last change
        distinctUntilChanged(), // only emit if value actually changes
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe((d) => {
        console.log(d);
        this.formChangEvent.emit(this.dataAndSecurityForm);
      });
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
