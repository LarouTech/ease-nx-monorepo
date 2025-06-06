import {
  FooterComponent,
  SideMenuComponent,
  SideMenuService,
  ToolbarComponent,
  ToolbarService,
} from '@ease-angular/ui';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ColorPaletteService,
  FirebaseAuthService,
} from '@ease-angular/services';
import { FadeInFadeOut } from '@ease-nx-monorepo/animations';
import { filter } from 'rxjs';

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
  animations: [FadeInFadeOut],
})
export class AppComponent implements AfterViewInit {
  title = 'EASE';
  colorPaletteService = inject(ColorPaletteService);
  private toolbarService = inject(ToolbarService);
  private firebaseAuth = inject(FirebaseAuthService);
  private sidemenuService = inject(SideMenuService);
  private cdrRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  // colorPalette = this.colorPaletteService.colorPalette_;
  isLoggedIn = this.firebaseAuth.isLoggedIn;

  toolbarControls = this.toolbarService.toolbarControls;
  sidemenuControls = this.sidemenuService.sidemenuControls;

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });
  }

  ngAfterViewInit() {
    this.cdrRef.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
