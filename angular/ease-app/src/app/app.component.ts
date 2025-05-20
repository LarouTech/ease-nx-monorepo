import {
  FooterComponent,
  SideMenuComponent,
  SideMenuService,
  ToolbarComponent,
  ToolbarService,
} from '@ease-angular/ui';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  private sidemenuService = inject(SideMenuService);
  colorPalette = this.colorPaletteService.colorPalette_;

  isLoggedIn = this.firebaseAuth.isLoggedIn;

  toolbarControls = this.toolbarService.toolbarControls;
  sidemenuControls = this.sidemenuService.sidemenuControls;
}
