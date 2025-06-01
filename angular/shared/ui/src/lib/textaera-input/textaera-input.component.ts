import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  input,
  output,
  type OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'textaera-input',
  imports: [CommonModule],
  templateUrl: './textaera-input.component.html',
  styleUrl: './textaera-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextaeraInputComponent),
      multi: true,
    },
  ],
})
export class TextaeraInputComponent {
  label = input<string>();
  name = input.required<string>();
  row = input<number>(10);
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

  valueChanged = output<string>();

  @HostBinding('attr.disabled')
  @Input()
  disabled = false;

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
