import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ButtonComponent } from '../button/button.component';
import { ToolbarControlsProps, ToolbarService } from './toolbar.service';
import { ColorPaletteService } from '@ease-angular/services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, ButtonComponent, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  providers: [ToolbarService],
})
export class ToolbarComponent {
  toolbarRef = viewChild<ElementRef<HTMLElement>>('toolbarRef');
  el = inject(ElementRef);
  private colorPaletteService = inject(ColorPaletteService);
  colorPalette = this.colorPaletteService.colorPalette_;
  brandName = input.required<string>();
  brandNameItalic = input(false);
  brandNameFontSize = input<string>('2.25rem');
  brandNameFontWeight = input<string>('bold');
  logo = input.required<string>();
  textColor = input<string>(this.colorPalette().darkGray);
  iconColor = input<string>();
  iconSize = input<string>('4rem');
  paddingHorizontal = input<string>('1rem');
  paddingVertical = input<string>('0.5rem');
  backgroundColor = input<string>('transparent');
  borderColor = input<string>('transparent');
  isFixed = input(false);
  isShadow = input(false);

  controls = input<ToolbarControlsProps[]>([]);
}
