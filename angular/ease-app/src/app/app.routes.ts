import { Route } from '@angular/router';
import { HomeRoutes } from './home-page/home.routes';
import { LobbyRoutes } from './lobby-page/lobby.routes';
import { PortfolioRoutes } from './lobby-page/portfolios-page/portfolio.routes';

export const appRoutes: Route[] = [
  ...HomeRoutes,
  ...LobbyRoutes,
  {
    path: '**',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (c) => c.PageNotFoundComponent
      ),
  },
];
