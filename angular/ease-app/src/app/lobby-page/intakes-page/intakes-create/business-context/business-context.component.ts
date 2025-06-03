import { CommonModule } from '@angular/common';
import { Component, input, output, type OnInit } from '@angular/core';
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
  selector: 'business-context',
  imports: [
    SelectInputComponent,
    ReactiveFormsModule,
    CommonModule,
    TextaeraInputComponent,
    FormfieldComponent,
    FormCardComponent,
  ],
  templateUrl: './business-context.component.html',
  styleUrl: './business-context.component.css',
})
export class BusinessContextComponent implements OnInit {
  businessContextForm!: FormGroup;

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  formName = 'businessContext';

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
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
