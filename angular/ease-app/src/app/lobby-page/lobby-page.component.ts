import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '@ease-angular/services';
import { ToolbarService } from 'angular/shared/ui/src/lib/toolbar/toolbar.service';

@Component({
  selector: 'app-lobby-page',
  imports: [],
  templateUrl: './lobby-page.component.html',
  styleUrl: './lobby-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyPageComponent {
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

  async onLogout() {
    try {
      await this.firebaseAuth.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
