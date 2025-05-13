import {
  FooterComponent,
  SideMenuComponent,
  ToolbarComponent,
  ToolbarControlsProps,
} from '@ease-angular/ui';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EASE_COLORS } from '@ease/const';
import { CommonModule } from '@angular/common';
import { ToolbarService } from 'angular/shared/ui/src/lib/toolbar/toolbar.service';

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
  title = 'ease-app';
  easeColors = EASE_COLORS;

  private toolbarService = inject(ToolbarService);

  //TO BE REFACTOR WHEN IMPLEMENTING AUTH
  isAuth = false;

  toolbarControls = this.toolbarService.toolbarControls;

  menu = [
    { label: 'Home', icon: 'home', action: () => console.log('Home clicked') },
    {
      label: 'Profile',
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
