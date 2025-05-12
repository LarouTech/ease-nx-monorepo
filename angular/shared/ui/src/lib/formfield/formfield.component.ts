import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  HostBinding,
  input,
  output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { EASE_COLORS } from '@ease/const';

@Component({
  selector: 'formfield',
  standalone: true,
  imports: [CommonModule],
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
export class FormfieldComponent implements ControlValueAccessor {
  palette = EASE_COLORS;
  label = input<string>();
  placeholder = input<string>('');
  hint = input<string>();
  type = input<string>('text');
  borderColor = input<string>(EASE_COLORS.primary);
  backgroundColor = input<string>('transparent');
  color = input<string>();
  hintColor = input<string>(EASE_COLORS.text);
  padding = input<string>('0.5rem 1rem');
  borderWidth = input<string>('1px');
  borderStyle = input<string>('solid');
  focusColor = input<string>();

  valueChanged = output<string>();

  @HostBinding('attr.disabled') @Input() disabled = false;

  value = '';
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
