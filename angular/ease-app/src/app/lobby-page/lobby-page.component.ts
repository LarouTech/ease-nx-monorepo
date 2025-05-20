import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FirebaseAuthService } from '@ease-angular/services';
import { ToolbarService } from '@ease-angular/ui';

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
  private firebaseAuth = inject(FirebaseAuthService);
  private router = inject(Router);

  ngOnInit() {
    this.setLobbyPageToolbarControls();
  }

  private setLobbyPageToolbarControls() {
    this.toolbarService.updateControls([
      {
        type: 'icon-badge',
        icon: 'logout',
        action: () => this.onLogout(),
        label: 'logout',
      },
    ]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  async onLogout() {
    try {
      await this.firebaseAuth.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
