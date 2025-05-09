import { EASE_COLORS } from '@ease/const';
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ButtonComponent } from '../button/button.component';

export interface ToolbarControlsProps {
  icon: string;
  label: string;
  action: () => void;
}

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, ButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  easeColor = EASE_COLORS;
  brandName = input.required<string>();
  brandNameItalic = input(false);
  brandNameFontSize = input<string>('2.25rem');
  brandNameFontWeight = input<string>('bold');
  logo = input.required<string>();
  textColor = input<string>(EASE_COLORS.text);
  iconColor = input<string>();
  iconSize = input<string>('4rem');
  paddingHorizontal = input<string>('1.25rem');
  paddingVertical = input<string>('0.5rem');
  backgroundColor = input<string>(EASE_COLORS.background);
  borderColor = input<string>('#e5e7eb ');
  isFixed = input(false);

  controls = input<ToolbarControlsProps[]>([]);
}
