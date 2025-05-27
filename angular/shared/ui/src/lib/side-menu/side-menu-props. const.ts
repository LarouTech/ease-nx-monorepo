import { Router } from '@angular/router';
import { SidemenuItemProps } from './side-menu.service';

export const SIDEDMENU_PROPS = (router: Router): SidemenuItemProps[] => {
  return [
    {
      label: 'Lobby',
      icon: 'bell',
      action: () => router.navigate(['/', 'lobby']),
      isSelected: false,
      route: '/lobby',
    },
    {
      label: 'Porfolios',
      icon: 'portfolio',
      action: () => router.navigate(['/', 'lobby', 'portfolios']),
      isSelected: false,
      route: '/lobby/portfolios',
      submenuItems: [
        {
          label: 'List',
          icon: 'list',
          action: () => router.navigate(['/', 'lobby', 'portfolios']),
          isSelected: false,
          route: '/lobby/portfolios',
        },
        {
          label: 'Create',
          icon: 'add',
          action: () => router.navigate(['/', 'lobby', 'portfolios', 'create']),
          isSelected: false,
          route: '/lobby/portfolios/create',
        },
      ],
    },
    {
      label: 'Intakes',
      icon: 'checklist',
      action: () => router.navigate(['/', 'lobby', 'intakes']),
      isSelected: false,
      route: '/lobby/intakes',
    },
    {
      label: 'Cost Estimator',
      icon: 'estimate',
      action: () => console.log('Intakes clicked'),
      isSelected: false,
    },
    {
      label: 'Requests',
      icon: 'request',
      action: () => console.log('Profile clicked'),
      isSelected: false,
    },
    {
      label: 'Settings',
      icon: 'settings',
      action: () => router.navigate(['/', 'lobby', 'profile-creation']),
      isSelected: false,
    },
    {
      label: 'Logout',
      icon: 'logout',
      action: () => console.log('Logout clicked'),
      isSelected: false,
    },
  ];
};
