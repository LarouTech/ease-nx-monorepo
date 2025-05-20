import { RouterModule, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { SideMenuService } from '@ease-angular/ui';
import { Location } from '@angular/common';
import { FadeInFadeOut } from '@ease-nx-monorepo/animations';

@Component({
  selector: 'portfolios-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './portfolios-page.component.html',
  styleUrl: './portfolios-page.component.css',
  animations: [FadeInFadeOut],
})
export class PortfoliosPageComponent {
  private sidemenuService = inject(SideMenuService);
  private location = inject(Location);

  testArray = Array(5);

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  // ngOnInit(): void {
  //   this.setSidemenuControls();
  // }

  // setSidemenuControls() {
  //   this.sidemenuService.updateControls([
  //     {
  //       label: 'Lobby',
  //       icon: 'dashboard',
  //       action: () => this.location.back(),
  //       isSelected: false,
  //     },
  //     {
  //       label: 'Create',
  //       icon: 'add',
  //       action: () => console.log('Create clicked'),
  //       isSelected: false,
  //     },
  //     {
  //       label: 'List',
  //       icon: 'list',
  //       action: () => console.log('List clicked'),
  //       isSelected: false,
  //     },
  //   ]);
  // }
}
