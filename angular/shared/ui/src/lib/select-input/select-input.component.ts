import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  HostListener,
  ViewChild,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'select-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() name!: string;
  @Input() hint?: string;
  @Input() options: Array<{ label: string; value: string }> = [];
  @Input() backgroundColor = 'var(--background';
  @Input() borderColor = 'var(--gray)';
  @Input() color = 'var(--text)';
  @Input() hintColor = 'var(--text)';
  @Input() padding = '.75rem 1rem';
  @Input() disabled = false;

  @Output() valueChanged = new EventEmitter<string>();

  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('dropdown') dropdownTemplate!: TemplateRef<unknown>;

  overlayRef!: OverlayRef;
  value = '';
  isOpen = false;

  constructor(private overlay: Overlay, private vcr: ViewContainerRef) {}

  // Called when the component is touched (for ControlValueAccessor)
  onTouched = (ev: Event) => {
    ev.stopPropagation();
    // You can set a touched state here if needed
  };
  onChange = (value: string) => {
    this.valueChanged.emit(value);
  };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (this.disabled) return;

    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown(): void {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'select-input',
      direction: 'ltr',
    });

    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());

    const portal = new TemplatePortal(this.dropdownTemplate, this.vcr);
    this.overlayRef.attach(portal);
    this.isOpen = true;
  }

  closeDropdown(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.isOpen = false;
    }
  }

  selectOption(value: string): void {
    this.value = value;
    this.onChange(value);
    this.closeDropdown();
  }

  isSelected(value: string): boolean {
    return this.value === value;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeDropdown();
  }
}
