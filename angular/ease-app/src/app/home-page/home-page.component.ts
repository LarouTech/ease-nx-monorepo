import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToolbarService } from 'angular/shared/ui/src/lib/toolbar/toolbar.service';
import { FadeInFadeOut } from '@ease-nx-monorepo/animations';

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

  ngOnInit() {
    this.setHomePageToolbarControls();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  private setHomePageToolbarControls(): void {
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
    ]);
  }
}
