import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { RouterModule } from '@angular/router';

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
}
