import { Routes } from '@angular/router';

export const architecturePorposalsRoutes: Routes = [
  {
    path: 'architecture-proposals',
    loadComponent: () =>
      import('./architecture-proposals.component').then(
        (c) => c.ArchitectureProposalsComponent
      ),
    data: { animation: 'ArchitectureProposalsPage' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './list-archiecture-proposals/list-archiecture-proposals.component'
          ).then((c) => c.ListArchiectureProposalsComponent),
        data: { animation: 'ListArchitectureProposalsPage' },
      },
      {
        path: ':id',
        loadComponent: () =>
          import(
            './view-archiecture-proposal/view-archiecture-proposal.component'
          ).then((c) => c.ViewArchiectureProposalComponent),
        data: { animation: 'ViewArchitectureProposalPage' },
      },
    ],
  },
];
