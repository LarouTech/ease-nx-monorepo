import {
  ChangeDetectorRef,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {
  ColorPaletteService,
  FirebaseAuthService,
} from '@ease-angular/services';
import { ToolbarControlsProps, ToolbarService } from '@ease-angular/ui';

import { FadeInFadeOut } from '@ease-nx-monorepo/animations';

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

  // Computed signal for reactive binding if needed
  // isDarkMode = computed(() => this.paletteService.isDarkMode());

  ngOnInit(): void {
    this.updateToolbar();
  }

  toggleDarkMode(): void {
    this.paletteService.toggleDarkMode();
    this.updateToolbar(); // Update toolbar icon
  }

  async onLogout(): Promise<void> {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  prepareRoute(outlet: RouterOutlet): string | undefined {
    return outlet?.activatedRouteData?.['animation'];
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
    const isDark = this.paletteService.isDarkMode();
    return {
      type: 'icon-badge',
      icon: isDark ? 'sun' : 'moon',
      action: () => this.toggleDarkMode(),
      label: 'dark mode',
      backgroundColor: 'var(--secondary)',
    };
  }
}
