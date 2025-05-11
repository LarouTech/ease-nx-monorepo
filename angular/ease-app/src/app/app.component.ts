import {
  FooterComponent,
  SideMenuComponent,
  ToolbarComponent,
  ToolbarControlsProps,
} from '@ease-angular/ui';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EASE_COLORS } from '@ease/const';

@Component({
  imports: [RouterModule, SideMenuComponent, ToolbarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ease-app';
  easeColors = EASE_COLORS;

  toolbarControls: ToolbarControlsProps[] = [
    {
      icon: 'home',
      label: 'Home',
      type: 'link',
      action: () => {
        console.log('home');
      },
    },
    {
      icon: 'user',
      label: 'About',
      type: 'icon-badge',

      action: () => {
        console.log('user');
      },
    },
  ];

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
