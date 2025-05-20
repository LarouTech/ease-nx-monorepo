import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuService, SvgIconComponent } from '@ease-angular/ui';
import { EASE_FEATURE_CARDS_PROPS } from './feature-card-props.const';

@Component({
  selector: 'app-lobby-content-page',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './lobby-content-page.component.html',
  styleUrl: './lobby-content-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyContentPageComponent {
  private router = inject(Router);
  private sidemnuService = inject(SideMenuService);

  // ngOnInit() {
  //   this.setSidemenuControls();
  // }

  easeFeatureCardsProps = EASE_FEATURE_CARDS_PROPS;

  // setSidemenuControls() {
  //   this.sidemnuService.updateControls([
  //     {
  //       label: 'Lobby',
  //       icon: 'bell',
  //       action: () => this.router.navigate(['/', 'lobby']),
  //       isSelected: false,
  //     },
  //     {
  //       label: 'Porfolios',
  //       icon: 'portfolio',
  //       action: () => console.log('portofilio'), //this.router.navigate(['/', 'lobby', 'portfolio']),
  //       isSelected: true,
  //       submenuItems: [
  //         {
  //           label: 'Create',
  //           icon: 'add',
  //           action: () => console.log('Create clicked'),
  //           isSelected: false,
  //         },
  //         {
  //           label: 'List',
  //           icon: 'list',
  //           action: () => console.log('List clicked'),
  //           isSelected: false,
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Intakes',
  //       icon: 'checklist',
  //       action: () => console.log('Intakes clicked'),
  //       isSelected: false,
  //     },
  //     {
  //       label: 'Cost Estimator',
  //       icon: 'estimate',
  //       action: () => console.log('Intakes clicked'),
  //       isSelected: false,
  //     },
  //     {
  //       label: 'Requests',
  //       icon: 'request',
  //       action: () => console.log('Profile clicked'),
  //       isSelected: false,
  //     },
  //     {
  //       label: 'Settings',
  //       icon: 'settings',
  //       action: () => console.log('Settings clicked'),
  //       isSelected: false,
  //     },
  //     {
  //       label: 'Logout',
  //       icon: 'logout',
  //       action: () => console.log('Logout clicked'),
  //       isSelected: false,
  //     },
  //   ]);
  // }
}
