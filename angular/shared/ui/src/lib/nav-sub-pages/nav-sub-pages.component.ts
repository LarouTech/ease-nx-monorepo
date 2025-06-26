import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RouterModule } from '@angular/router';
import { ColorPaletteService } from '@ease-angular/services';

export interface NavSubPagesLink {
  label: string;
  icon?: string;
  route: string;
  disabled?: boolean;
  hidden?: boolean;
}

@Component({
  selector: 'nav-sub-pages',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, RouterModule],
  templateUrl: './nav-sub-pages.component.html',
  styleUrl: './nav-sub-pages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavSubPagesComponent {
  section = input.required<string>();
  links = input.required<NavSubPagesLink[]>();

  private location = inject(Location);
  private colorPallete = inject(ColorPaletteService);

  isDarkMode = this.colorPallete.isDarkMode;

  onBack() {
    this.location.back();
  }
}
