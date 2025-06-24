import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavSubPagesComponent, NavSubPagesLink } from '@ease-angular/ui';
import { FadeInFadeOut } from '@ease-nx-monorepo/animations';
import { filter } from 'rxjs';

@Component({
  selector: 'intakes-page',
  imports: [CommonModule, RouterModule, NavSubPagesComponent],
  templateUrl: './intakes-page.component.html',
  styleUrl: './intakes-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FadeInFadeOut],
})
export class IntakesPageComponent implements OnInit, AfterViewInit {
  private cdrRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  navSubLinks: NavSubPagesLink[] = [
    {
      label: 'list',
      route: '/lobby/intakes',
    },
    {
      label: 'create',
      route: '/lobby/intakes/create',
    },
    {
      label: 'view',
      route: '/lobby/intakes/:id',
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
      if (params['id']) {
        this.navSubLinks[2].hidden = false;
        this.navSubLinks[2].route = `/lobby/intakes/${params['id']}`;
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
