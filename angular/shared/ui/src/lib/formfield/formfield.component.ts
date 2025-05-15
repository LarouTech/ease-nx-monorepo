import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Input,
  HostBinding,
  input,
  output,
  inject,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ColorPaletteService } from '@ease-angular/services';

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
  colorPalette = inject(ColorPaletteService);

  palette = this.colorPalette.colorPalette_;
  label = input<string>();
  name = input.required<string>();
  placeholder = input<string>('');
  hint = input<string>();
  type = input<string>('text');
  borderColor = input<string>(this.palette().lightGray);
  backgroundColor = input<string>('transparent');
  color = input<string>(this.palette().primary);
  hintColor = input<string>(this.palette().text);
  padding = input<string>('.75rem 1rem');
  borderWidth = input<string>();
  borderStyle = input<string>();
  focusColor = input<string>('var(--primary');

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
