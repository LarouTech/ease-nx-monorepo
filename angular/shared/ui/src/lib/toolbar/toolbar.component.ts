import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ButtonComponent } from '../button/button.component';
import { ToolbarControlsProps, ToolbarService } from './toolbar.service';
import { RouterModule } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { FirebaseAuthService, ProfileService } from '@ease-angular/services';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    CommonModule,
    SvgIconComponent,
    ButtonComponent,
    RouterModule,
    AvatarComponent,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
  providers: [ToolbarService],
})
export class ToolbarComponent implements AfterViewInit {
  toolbarRef = viewChild<ElementRef<HTMLElement>>('toolbarRef');
  el = inject(ElementRef);
  private authService = inject(FirebaseAuthService);
  private cdr = inject(ChangeDetectorRef);
  private profileService = inject(ProfileService);
  profile_ = this.profileService.profile_;
  isLoggedIn = this.authService.isLoggedIn;

  brandName = input.required<string>();
  brandNameItalic = input(false);
  brandNameFontSize = input<string>('2.25rem');
  brandNameFontWeight = input<string>('bold');
  logo = input.required<string>();
  textColor = input<string>('var(--text)');
  iconColor = input<string>('var(--primary');
  iconSize = input<string>('4rem');
  paddingHorizontal = input<string>('1rem');
  paddingVertical = input<string>('0.5rem');
  backgroundColor = input<string>('var(--background');
  borderColor = input<string>('transparent');
  isFixed = input(false);
  isShadow = input(false);

  controls = input<ToolbarControlsProps[]>([]);

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
