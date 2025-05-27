import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {
  ToolbarControlsProps,
  ToolbarService,
} from 'angular/shared/ui/src/lib/toolbar/toolbar.service';
import { FadeInFadeOut } from '@ease-nx-monorepo/animations';
import { ColorPaletteService } from '@ease-angular/services';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  animations: [FadeInFadeOut],
})
export class HomePageComponent implements OnInit {
  private toolbarService = inject(ToolbarService);
  private router = inject(Router);
  private paletteService = inject(ColorPaletteService);

  // isDarkMode = computed(() => this.paletteService.isDarkMode());

  ngOnInit() {
    this.setHomePageToolbarControls();
  }

  toggleDarkMode(): void {
    this.paletteService.toggleDarkMode();
    this.setHomePageToolbarControls(); // Update toolbar icon
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  private setHomePageToolbarControls(): void {
    const darkModeControl = this.getDarkModeControl();
    this.toolbarService.updateControls([
      {
        label: 'Login',
        action: () => this.router.navigate(['/', 'home', 'login']),
        type: 'link',
      },
      {
        label: 'Signin',
        action: () => this.router.navigate(['/', 'home', 'signin']),
        type: 'link',
      },
      darkModeControl,
    ]);
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
