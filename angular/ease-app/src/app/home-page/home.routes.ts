import { redirectIfLoginGuard } from '@ease-angular/services';
import { Routes } from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home-page.component').then((m) => m.HomePageComponent),
    canActivate: [redirectIfLoginGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./landing-page/landing-page.component').then(
            (c) => c.LandingPageComponent
          ),
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./signin-page/signin-page.component').then(
            (c) => c.SigninPageComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login-page/login-page.component').then(
            (c) => c.LoginPageComponent
          ),
      },
    ],
  },
];
