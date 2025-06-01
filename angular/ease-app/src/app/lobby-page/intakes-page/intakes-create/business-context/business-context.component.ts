import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
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
  FormfieldComponent,
  SelectInputComponent,
  SvgIconComponent,
  TextaeraInputComponent,
} from '@ease-angular/ui';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'business-context',
  imports: [
    SelectInputComponent,
    ReactiveFormsModule,
    CommonModule,
    TextaeraInputComponent,
    FormfieldComponent,
    SvgIconComponent,
  ],
  templateUrl: './business-context.component.html',
  styleUrl: './business-context.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessContextComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  businessContextForm!: FormGroup;

  formChangEvent = output<FormGroup>();

  formName = 'businessContext';

  focusColor = 'var(--primary';

  ngOnInit() {
    this.initializeForm();
    this.formChangeEmitter();
  }

  private formChangeEmitter() {
    this.businessContextForm.valueChanges
      .pipe(
        debounceTime(1000), // wait 300ms after last change
        distinctUntilChanged(), // only emit if value actually changes
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe((d) => {
        console.log(d);
        this.formChangEvent.emit(this.businessContextForm);
      });
  }

  private initializeForm() {
    this.businessContextForm = new FormGroup({
      businessDriver: new FormControl('', Validators.required),
      problemStatement: new FormControl('', Validators.required),
      isPartOfLargerInitative: new FormControl('', Validators.required),
      initiative: new FormControl('', Validators.required),
      isDeadlineOrRegulatory: new FormControl('', Validators.required),
      deadline: new FormControl('', Validators.required),
      impactIfNotImpelemented: new FormControl('', Validators.required),
    });
  }
}
