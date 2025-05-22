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
    data: { animation: 'HomePage' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./landing-page/landing-page.component').then(
            (c) => c.LandingPageComponent
          ),
        data: { animation: 'LandingPage' },
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./signin-page/signin-page.component').then(
            (c) => c.SigninPageComponent
          ),
        data: { animation: 'LoginPage' },
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login-page/login-page.component').then(
            (c) => c.LoginPageComponent
          ),
        data: { animation: 'SigninPage' },
      },
    ],
  },
];
