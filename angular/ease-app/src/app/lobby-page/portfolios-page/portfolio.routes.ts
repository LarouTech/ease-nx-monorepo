import { Routes } from '@angular/router';

export const PortfolioRoutes: Routes = [
  {
    path: 'portfolios',
    loadComponent: () =>
      import('./portfolios-page.component').then(
        (c) => c.PortfoliosPageComponent
      ),
    data: { animation: 'PortfolioPage' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./list-portfolio-page/list-portfolio-page.component').then(
            (c) => c.ListPortfolioPageComponent
          ),
        data: { animation: 'PortfolioListPage' },
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './create-portfolio-page/create-portfolio-page.component'
          ).then((c) => c.CreatePortfolioPageComponent),
        data: { animation: 'PortfolioCreatePage' },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./edit-portfolio-page/edit-portfolio-page.component').then(
            (c) => c.EditPortfolioComponent
          ),
        data: { animation: 'PortfolioCreatePage' },
      },
    ],
  },
];
