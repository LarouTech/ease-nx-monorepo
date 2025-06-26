import { Routes } from '@angular/router';
import { firebaseAuthGuard } from '@ease-angular/services';
import { PortfolioRoutes } from './portfolios-page/portfolio.routes';
import { IntakesRoutes } from './intakes-page/intakes.routes';
import { architecturePorposalsRoutes } from './architecture-proposals/architecture-proposals.routes';

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
      ...IntakesRoutes,
      ...architecturePorposalsRoutes,
      {
        path: 'cost-estimator',
        loadComponent: () =>
          import('./cost-estimator/cost-estimator.component').then(
            (c) => c.CostEstimatorComponent
          ),
        children: [],
      },
      {
        path: 'profile-creation',
        loadComponent: () =>
          import(
            './profile-creation-page/profile-creation-page.component'
          ).then((c) => c.ProfileCreationPageComponent),
      },
    ],
  },
];
