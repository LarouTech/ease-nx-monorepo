import { TechnicalConsiderationsFormComponent } from './../technical-considerations-form/technical-considerations-form.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
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
  selector: 'timeline-and-delivery',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormCardComponent,
    FormfieldComponent,
    SelectInputComponent,
    TextaeraInputComponent,
  ],
  templateUrl: './timeline-and-delivery.component.html',
  styleUrl: './timeline-and-delivery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineAndDeliveryComponent implements OnInit {
  timelineAndDeliveryForm!: FormGroup;

  formName = 'timelineAndDelivery';

  id = input.required<string>();
  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.initializeForm();
  }

  onFormUpdate(form: FormGroup) {
    this.formChangEvent.emit(form);
  }

  private initializeForm() {
    this.timelineAndDeliveryForm = new FormGroup({
      requestedStartDate: new FormControl('', Validators.required),
      targetGoLiveDate: new FormControl('', Validators.required),
      isHardDeadline: new FormControl('', Validators.required),
      hardDeadlineDetails: new FormControl('', Validators.required),
      isLinkedToExternalInitiative: new FormControl('', Validators.required),
      externalInitiativeDetails: new FormControl('', Validators.required),
      levelOfUrgency: new FormControl('', Validators.required),
      deliveryModel: new FormControl('', Validators.required),
    });
  }
}
