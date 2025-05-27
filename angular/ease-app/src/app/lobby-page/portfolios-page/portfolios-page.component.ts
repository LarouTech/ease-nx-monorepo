import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NavSubPagesComponent, NavSubPagesLink } from '@ease-angular/ui';
import { CommonModule } from '@angular/common';
import { FadeInFadeOut } from '@ease-nx-monorepo/animations';
import { filter } from 'rxjs';

@Component({
  selector: 'portfolios-page',
  standalone: true,
  imports: [RouterModule, NavSubPagesComponent, CommonModule],
  templateUrl: './portfolios-page.component.html',
  styleUrl: './portfolios-page.component.css',
  animations: [FadeInFadeOut],
})
export class PortfoliosPageComponent implements AfterViewInit, OnInit {
  private cdrRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  navSubLinks: NavSubPagesLink[] = [
    {
      label: 'list',
      route: '/lobby/portfolios',
    },
    {
      label: 'create',
      route: '/lobby/portfolios/create',
    },
    {
      label: 'edit',
      route: '/lobby/portfolios/edit',
      hidden: true, // This will be hidden until a portfolio is selected
    },
  ];

  ngOnInit() {
    // Run logic on initial load (manual refresh)
    this.updateEditLink();

    // Re-run logic on route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateEditLink();
      });
  }

  ngAfterViewInit() {
    this.cdrRef.detectChanges();
  }

  private updateEditLink(): void {
    const route = this.getChildRoute(this.route);
    route.params.subscribe((params) => {
      const currentUrl = this.router.url;
      if (currentUrl.includes('edit') && params['id']) {
        this.navSubLinks[2].hidden = false;
        this.navSubLinks[2].route = `/lobby/portfolios/edit/${params['id']}`;
      } else {
        this.navSubLinks[2].hidden = true;
      }
    });
  }

  private getChildRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
