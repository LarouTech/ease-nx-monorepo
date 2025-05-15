import { Route } from '@angular/router';
import {
  firebaseAuthGuard,
  redirectIfLoginGuard,
} from '@ease-angular/services';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    canActivate: [redirectIfLoginGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home-page/landing-page/landing-page.component').then(
            (c) => c.LandingPageComponent
          ),
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./home-page/signin-page/signin-page.component').then(
            (c) => c.SigninPageComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./home-page/login-page/login-page.component').then(
            (c) => c.LoginPageComponent
          ),
      },
    ],
  },
  {
    path: 'lobby',
    loadComponent: () =>
      import('./lobby-page/lobby-page.component').then(
        (c) => c.LobbyPageComponent
      ),
    canActivate: [firebaseAuthGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
];
