import { CommonModule } from '@angular/common';
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
  FormCardComponent,
  FormfieldComponent,
  SelectInputComponent,
  TextaeraInputComponent,
} from '@ease-angular/ui';

@Component({
  selector: 'project-details-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormfieldComponent,
    TextaeraInputComponent,
    SelectInputComponent,
    FormCardComponent,
  ],
  templateUrl: './project-details-form.component.html',
  styleUrl: './project-details-form.component.css',
})
export class ProjectDetailsFormComponent implements OnInit {
  projectDetailsForm!: FormGroup;

  formName = 'projectDetails';

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
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
