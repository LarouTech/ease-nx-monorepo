import {
  DestroyRef,
  Inject,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { SIDEDMENU_PROPS } from './side-menu-props. const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface SidemenuItemProps {
  label: string;
  action?: () => void;
  icon: string;
  isSelected: boolean;
  submenuItems?: SidemenuItemProps[];
  route?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  sidemenuControls: WritableSignal<SidemenuItemProps[]> = signal([]);
  private router = inject(Router);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.sidemenuControls.set(SIDEDMENU_PROPS(this.router));

    // Update selection on navigation
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.updateSelectionFromCurrentRoute());

    // Initial selection
    this.updateSelectionFromCurrentRoute();
  }

  updateSelectionFromCurrentRoute(): void {
    const currentPath = this.location.path();
    const menuItems = this.sidemenuControls();

    // Reset selection
    for (const item of menuItems) {
      item.isSelected = false;
      if (item.submenuItems) {
        for (const subItem of item.submenuItems) {
          subItem.isSelected = false;
        }
      }
    }

    // Track best match
    let bestMatch: {
      item: SidemenuItemProps;
      subItem?: SidemenuItemProps;
    } | null = null;
    let longestMatchLength = -1;

    for (const item of menuItems) {
      // Match submenu item exactly
      if (item.submenuItems) {
        for (const subItem of item.submenuItems) {
          if (
            subItem.route === currentPath &&
            subItem.route.length > longestMatchLength
          ) {
            bestMatch = { item, subItem };
            longestMatchLength = subItem.route.length;
          }
        }
      }

      // Match item route as prefix
      if (
        item.route &&
        currentPath.startsWith(item.route) &&
        item.route.length > longestMatchLength
      ) {
        bestMatch = { item };
        longestMatchLength = item.route.length;
      }
    }

    // Apply best match
    if (bestMatch) {
      bestMatch.item.isSelected = true;
      if (bestMatch.subItem) {
        bestMatch.subItem.isSelected = true;
      }
    }

    this.sidemenuControls.set(menuItems);
  }
}
