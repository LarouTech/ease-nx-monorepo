import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {
  ColorPaletteService,
  FirebaseAuthService,
} from '@ease-angular/services';
import { ToolbarControlsProps, ToolbarService } from '@ease-angular/ui';

import { FadeInFadeOut } from '@ease-nx-monorepo/animations';
import { COLOR_PALETTE, DARK_COLOR_PALETTE } from '../../color.palette';

@Component({
  selector: 'app-lobby-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lobby-page.component.html',
  styleUrl: './lobby-page.component.css',
  animations: [FadeInFadeOut],
})
export class LobbyPageComponent implements OnInit {
  private toolbarService = inject(ToolbarService);
  private authService = inject(FirebaseAuthService);
  private router = inject(Router);
  private paletteService = inject(ColorPaletteService);
  private cdr = inject(ChangeDetectorRef);

  isDarkMode = signal(false);

  ngOnInit(): void {
    this.updateToolbar();
    this.cdr.detectChanges();
  }

  toggleDarkMode(): void {
    this.isDarkMode.update((prev) => !prev);
    const palette = this.isDarkMode() ? DARK_COLOR_PALETTE : COLOR_PALETTE;
    this.paletteService.setColorPalette(palette);
    this.updateToolbar();
  }

  prepareRoute(outlet: RouterOutlet): string | undefined {
    return outlet?.activatedRouteData?.['animation'];
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  private updateToolbar(): void {
    const darkModeControl = this.getDarkModeControl();
    const logoutControl: ToolbarControlsProps = {
      type: 'icon-badge',
      icon: 'logout',
      action: () => this.onLogout(),
      label: 'logout',
    };

    this.toolbarService.updateControls([logoutControl, darkModeControl]);
  }

  private getDarkModeControl(): ToolbarControlsProps {
    const isDark = this.isDarkMode();
    return {
      type: 'icon-badge',
      icon: isDark ? 'sun' : 'moon',
      action: () => this.toggleDarkMode(),
      label: 'dark mode',
    };
  }
}
