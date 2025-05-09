import {
  ButtonComponent,
  ToolbarComponent,
  ToolbarControlsProps,
} from '@ease-angular/ui';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EASE_COLORS } from '@ease/const';

@Component({
  imports: [RouterModule, ButtonComponent, ToolbarComponent],
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
      action: () => {
        console.log('home');
      },
    },
    {
      icon: 'user',
      label: 'About',
      action: () => {
        console.log('user');
      },
    },
  ];

  onTest(event: MouseEvent) {
    console.log('test', event);
  }
}
