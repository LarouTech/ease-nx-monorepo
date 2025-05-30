import { Routes } from '@angular/router';

export const IntakesRoutes: Routes = [
  {
    path: 'intakes',
    loadComponent: () =>
      import('./intakes-page.component').then((c) => c.IntakesPageComponent),
    data: { animation: 'IntakesPage' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./intakes-list/intakes-list.component').then(
            (c) => c.IntakesListComponent
          ),
        data: { animation: 'IntakesListPage' },
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./intakes-create/intakes-create.component').then(
            (c) => c.IntakesCreateComponent
          ),
        data: { animation: 'IntakesCreatePage' },
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./intakes-edit/intakes-edit.component').then(
            (c) => c.IntakesEditComponent
          ),
        data: { animation: 'IntakesCreatePage' },
      },
    ],
  },
];
