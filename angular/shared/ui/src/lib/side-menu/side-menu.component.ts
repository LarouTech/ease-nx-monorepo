import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ColorPaletteService } from '@ease-angular/services';
import { SidemenuItemProps, SideMenuService } from './side-menu.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'side-menu',
  imports: [CommonModule, SvgIconComponent, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
  private sidemenuService = inject(SideMenuService);
  private router = inject(Router);

  navRef_ = viewChild<ElementRef<HTMLElement>>('navRef');
  colorPaletteService = inject(ColorPaletteService);
  colorPalette = this.colorPaletteService.colorPalette_;
  menuItems = input<SidemenuItemProps[]>([]);
  toolbarRef = input<ToolbarComponent>();
  backgroundColor = input<string>();
  color = input<string>('#000000');
  focusColor = input<string>('var(--secondary');
  menuItemBackgroundColorColor = input<string>();
  contentPadding = input<string>('1rem');

  isOpen: WritableSignal<boolean> = signal(true);

  top: WritableSignal<number> = signal(0);

  initialTop = computed(() => {
    const isToolbarFixed = this.toolbarRef()?.isFixed;

    if (isToolbarFixed) {
      return this.toolbarRef()?.el.nativeElement.offsetHeight;
    } else return '0';
  });

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const isToolbarFixed = this.toolbarRef()?.isFixed();

    if (isToolbarFixed) return;

    if (scrollY > this.initialTop()) {
      this.top.set(0);
      return;
    }

    this.top.set(this.initialTop() - scrollY);
  }

  ngOnInit() {
    this.top.set(this.initialTop());
    this.router.events.subscribe((d) => console.log(d));
  }

  onClickMenuItem(item: SidemenuItemProps) {
    const currentControls = this.sidemenuService.sidemenuControls();

    // Deselect all menu and submenu items
    currentControls.forEach((menuItem) => {
      menuItem.isSelected = false;
      menuItem.submenuItems?.forEach((submenuItem) => {
        submenuItem.isSelected = false;
      });
    });

    // Mark the selected item
    item.isSelected = true;

    if (item.submenuItems) {
      item.submenuItems[0].isSelected = true;
    }

    // Update the corresponding menu item's selection state (optional if reference is the same)
    const updatedControls = currentControls.map((menuItem) => {
      if (menuItem.label === item.label) {
        return { ...menuItem, isSelected: true };
      }
      return menuItem;
    });

    this.sidemenuService.updateControls(updatedControls);
  }

  onClickSubmenuItem(
    parentItem: SidemenuItemProps,
    submenuItem: SidemenuItemProps
  ) {
    const currentControls = this.sidemenuService.sidemenuControls();

    // Deselect all
    currentControls.forEach((menuItem) => {
      menuItem.isSelected = false;
      menuItem.submenuItems?.forEach((subItem) => {
        subItem.isSelected = false;
      });
    });

    // Mark selected
    parentItem.isSelected = true;
    submenuItem.isSelected = true;

    const updatedControls = currentControls.map((menuItem) => {
      if (menuItem.label === parentItem.label) {
        const updatedSubmenuItems = menuItem.submenuItems?.map((subItem) => ({
          ...subItem,
          isSelected: subItem.label === submenuItem.label,
        }));

        return {
          ...menuItem,
          isSelected: true,
          submenuItems: updatedSubmenuItems,
        };
      }

      return {
        ...menuItem,
        isSelected: false,
        submenuItems: menuItem.submenuItems?.map((subItem) => ({
          ...subItem,
          isSelected: false,
        })),
      };
    });

    this.sidemenuService.updateControls(updatedControls);

    // // 👇 Ensure navigation happens explicitly
    // if (submenuItem.link) {
    //   this.router.navigate([submenuItem.link]);
    // }

    // Then optionally trigger any other action after a slight delay
    if (submenuItem.action) {
      setTimeout(() => submenuItem.action?.(), 10);
    }
  }

  toggleMenu() {
    this.isOpen.update((open) => !open);
  }
}
