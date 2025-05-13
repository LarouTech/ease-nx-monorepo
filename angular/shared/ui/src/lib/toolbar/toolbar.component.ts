import { EASE_COLORS } from '@ease/const';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ButtonComponent } from '../button/button.component';
import { ToolbarService } from './toolbar.service';

export interface ToolbarControlsProps {
  icon?: string;
  label?: string;
  action: () => void;
  type: 'button' | 'link' | 'dropdown' | 'menu' | 'icon-badge';
}

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, ButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  providers: [ToolbarService],
})
export class ToolbarComponent implements AfterViewInit {
  toolbarRef = viewChild<ElementRef<HTMLElement>>('toolbarRef');
  el = inject(ElementRef);
  easeColor = EASE_COLORS;
  brandName = input.required<string>();
  brandNameItalic = input(false);
  brandNameFontSize = input<string>('2.25rem');
  brandNameFontWeight = input<string>('bold');
  logo = input.required<string>();
  textColor = input<string>(EASE_COLORS.text);
  iconColor = input<string>();
  iconSize = input<string>('4rem');
  paddingHorizontal = input<string>('1rem');
  paddingVertical = input<string>('0.5rem');
  backgroundColor = input<string>();
  borderColor = input<string>('transparent');
  isFixed = input(false);
  isShadow = input(false);

  controls = input<ToolbarControlsProps[]>([]);

  ngAfterViewInit() {
    console.log(this.el);
  }
}
