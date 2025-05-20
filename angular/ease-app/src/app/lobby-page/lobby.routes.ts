import { Routes } from '@angular/router';
import { firebaseAuthGuard } from '@ease-angular/services';
import { PortfolioRoutes } from './portfolios-page/portfolio.routes';

export const LobbyRoutes: Routes = [
  {
    path: 'lobby',
    loadComponent: () =>
      import('./lobby-page.component').then((c) => c.LobbyPageComponent),
    canActivate: [firebaseAuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./lobby-content-page/lobby-content-page.component').then(
            (c) => c.LobbyContentPageComponent
          ),
        data: { animation: 'LobbyContentPage' },
      },
      ...PortfolioRoutes,
    ],
  },
];
