import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

export interface SidemenuItemProps {
  label: string;
  action?: () => void;
  icon: string;
  isSelected: boolean;
  link?: string;
  submenuItems?: SidemenuItemProps[];
}

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  sidemenuControls: WritableSignal<SidemenuItemProps[]> = signal([]);
  private router = inject(Router);

  constructor() {
    this.updateControls([
      {
        label: 'Lobby',
        icon: 'bell',
        action: () => this.router.navigate(['/', 'lobby']),
        isSelected: true,
      },
      {
        label: 'Porfolios',
        icon: 'portfolio',
        action: () => this.router.navigate(['/', 'lobby', 'portfolio']),
        isSelected: false,
        submenuItems: [
          {
            label: 'List',
            icon: 'list',
            action: () => this.router.navigate(['/', 'lobby', 'portfolio']),
            isSelected: false,
          },
          {
            label: 'Create',
            icon: 'add',
            action: () =>
              this.router.navigate(['/', 'lobby', 'portfolio', 'create']),
            isSelected: false,
          },
        ],
      },
      {
        label: 'Intakes',
        icon: 'checklist',
        action: () => console.log('Intakes clicked'),
        isSelected: false,
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
        action: () => console.log('Settings clicked'),
        isSelected: false,
      },
      {
        label: 'Logout',
        icon: 'logout',
        action: () => console.log('Logout clicked'),
        isSelected: false,
      },
    ]);

    this.router.events.subscribe((d) => console.log(d));
  }

  updateControls(controls: SidemenuItemProps[]) {
    this.sidemenuControls.set(controls);
  }
}
