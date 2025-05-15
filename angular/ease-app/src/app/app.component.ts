import {
  FooterComponent,
  SideMenuComponent,
  ToolbarComponent,
} from '@ease-angular/ui';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarService } from 'angular/shared/ui/src/lib/toolbar/toolbar.service';
import {
  ColorPaletteService,
  FirebaseAuthService,
} from '@ease-angular/services';

@Component({
  imports: [
    RouterModule,
    SideMenuComponent,
    ToolbarComponent,
    FooterComponent,
    CommonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EASE';
  colorPaletteService = inject(ColorPaletteService);
  private toolbarService = inject(ToolbarService);
  private firebaseAuth = inject(FirebaseAuthService);
  colorPalette = this.colorPaletteService.colorPalette_;

  isLoggedIn = this.firebaseAuth.isLoggedIn;

  toolbarControls = this.toolbarService.toolbarControls;

  menu = [
    { label: 'Home', icon: 'home', action: () => console.log('Home clicked') },
    {
      label: 'Profile',
      icon: 'profile',
      action: () => console.log('Profile clicked'),
    },
    {
      label: 'Library',
      icon: 'profile',
      action: () => console.log('Profile clicked'),
    },
    {
      label: 'Settings',
      icon: 'settings',
      action: () => console.log('Settings clicked'),
    },
    {
      label: 'Logout',
      icon: 'logout',
      action: () => console.log('Logout clicked'),
    },
  ];

  onTest(event: MouseEvent) {
    console.log('test', event);
  }
}
