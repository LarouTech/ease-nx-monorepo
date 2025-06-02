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
import { FormfieldComponent, SvgIconComponent } from '@ease-angular/ui';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'requestor-information-form',
  imports: [FormfieldComponent, ReactiveFormsModule, SvgIconComponent],
  templateUrl: './requestor-information-form.component.html',
  styleUrl: './requestor-information-form.component.css',
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
export class RequestorInformationFormComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  requestorInformationForm!: FormGroup;

  formName = 'requestorInformation';

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.initializeForm();
    this.formChangeEmitter();
  }

  private formChangeEmitter() {
    this.requestorInformationForm.valueChanges
      .pipe(
        debounceTime(1000), // wait 300ms after last change
        distinctUntilChanged(), // only emit if value actually changes
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe(() => {
        this.formChangEvent.emit(this.requestorInformationForm);
      });
  }

  private initializeForm() {
    this.requestorInformationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
    });
  }
}
