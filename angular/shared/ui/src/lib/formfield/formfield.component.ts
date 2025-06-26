import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  HostBinding,
  input,
  output,
  inject,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'formfield',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './formfield.component.html',
  styleUrl: './formfield.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormfieldComponent),
      multi: true,
    },
  ],
})
export class FormfieldComponent implements ControlValueAccessor, OnInit {
  label = input<string>();
  name = input.required<string>();
  placeholder = input<string>('');
  hint = input<string>();
  type = input<string>('text');
  borderColor = input<string>('var(--gray');
  backgroundColor = input<string>('transparent');
  color = input<string>('var(--text');
  hintColor = input<string>('var(--text');
  padding = input<string>('.75rem 1rem');
  borderWidth = input<string>();
  borderStyle = input<string>();
  focusColor = input<string>('var(--primary');
  labelColor = input<string>();

  valueChanged = output<string>();

  initialValue = input<string>('');

  @HostBinding('attr.disabled') @Input() disabled = false;

  value = '';

  ngOnInit() {
    this.value = this.initialValue() || '';
  }

  onChange: (value: string) => void = () => {
    this.valueChanged.emit(this.value);
  };

  onTouched: () => void = () => {
    console.log('touched');
  };

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.onTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
