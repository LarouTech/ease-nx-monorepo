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
  FormfieldComponent,
  SelectInputComponent,
  SvgIconComponent,
  TextaeraInputComponent,
} from '@ease-angular/ui';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'project-details-form',
  imports: [
    CommonModule,
    SvgIconComponent,
    ReactiveFormsModule,
    FormfieldComponent,
    TextaeraInputComponent,
    SelectInputComponent,
  ],
  templateUrl: './project-details-form.component.html',
  styleUrl: './project-details-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsFormComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  projectDetailsForm!: FormGroup;

  formName = 'projectDetails';

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.initializeForm();
    this.formChangeEmitter();
  }

  private formChangeEmitter() {
    this.projectDetailsForm.valueChanges
      .pipe(
        debounceTime(1000), // wait 300ms after last change
        distinctUntilChanged(), // only emit if value actually changes
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe(() => {
        this.formChangEvent.emit(this.projectDetailsForm);
      });
  }

  private initializeForm() {
    this.projectDetailsForm = new FormGroup({
      initiativeName: new FormControl('', Validators.required),
      typeOfRequest: new FormControl('', Validators.required),
      solutionDescription: new FormControl('', Validators.required),
      targetUsersAndStakeholders: new FormControl('', Validators.required),
      numberOfEndUsers: new FormControl('', Validators.required),
      isSolutionAlreadyIdentified: new FormControl('', Validators.required),
      isVendorAlreadyIdentified: new FormControl('', Validators.required),
      isExisitingToolsOrPlatformsConsidered: new FormControl(
        '',
        Validators.required
      ),
      currentPainPoints: new FormControl('', Validators.required),
    });
  }
}
