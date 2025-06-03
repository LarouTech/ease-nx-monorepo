import { Component, input, output, type OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormCardComponent, FormfieldComponent } from '@ease-angular/ui';

@Component({
  selector: 'requestor-information-form',
  imports: [FormfieldComponent, ReactiveFormsModule, FormCardComponent],
  templateUrl: './requestor-information-form.component.html',
  styleUrl: './requestor-information-form.component.css',
})
export class RequestorInformationFormComponent implements OnInit {
  requestorInformationForm!: FormGroup;

  formName = 'requestorInformation';

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
  }

  private initializeForm() {
    this.requestorInformationForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        branch: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', Validators.required),
      },
      Validators.required
    );
  }
}
