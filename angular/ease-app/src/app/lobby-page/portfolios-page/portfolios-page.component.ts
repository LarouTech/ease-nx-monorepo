import { RouterModule, RouterOutlet } from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
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
export class PortfoliosPageComponent implements AfterViewInit {
  private sidemenuService = inject(SideMenuService);
  private location = inject(Location);
  private cdrRef = inject(ChangeDetectorRef);

  testArray = Array(5);

  ngAfterViewInit() {
    this.cdrRef.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
