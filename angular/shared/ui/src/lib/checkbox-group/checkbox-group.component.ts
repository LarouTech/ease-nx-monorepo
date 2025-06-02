import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'checkbox-group',
  imports: [CommonModule],
  templateUrl: './checkbox-group.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  options = input.required<string[]>();
  label = input<string>();
  name = input.required<string>();
  hint = input<string>();
  hintColor = input<string>('var(--text');
  color = input<string>('var(--text');

  values: string[] = [];

  disabled = false;

  onChange: (value: string[]) => void = () => {
    return;
  };
  onTouched: () => void = () => {
    return;
  };

  toggleOption(option: string): void {
    if (this.disabled) return;

    if (this.values.includes(option)) {
      this.values = this.values.filter((v) => v !== option);
    } else {
      this.values = [...this.values, option];
    }

    this.onChange(this.values);
    this.onTouched();
  }

  writeValue(value: string[]): void {
    this.values = value || [];
  }

  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  isChecked(option: string): boolean {
    return this.values.includes(option);
  }
}
