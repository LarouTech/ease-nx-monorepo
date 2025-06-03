import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  type OnInit,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'intake-form-card',
  imports: [SvgIconComponent, ReactiveFormsModule],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.css',
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
export class FormCardComponent implements OnInit {
  private destroyRef$ = inject(DestroyRef);
  form = input.required<FormGroup>();
  icon = input<string>();
  title = input<string>();

  formChangEvent = output<FormGroup>();

  ngOnInit() {
    this.formChangeEmitter();
  }

  private formChangeEmitter() {
    this.form()
      .valueChanges.pipe(
        debounceTime(1000), // wait 300ms after last change
        distinctUntilChanged(), // only emit if value actually changes
        takeUntilDestroyed(this.destroyRef$)
      )
      .subscribe(() => {
        this.formChangEvent.emit(this.form());
      });
  }
}
