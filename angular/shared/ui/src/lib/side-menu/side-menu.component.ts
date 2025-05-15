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

export interface SidemenuItemProps {
  label: string;
  action: () => void;
  icon: string;
}

@Component({
  selector: 'side-menu',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent implements OnInit {
  navRef_ = viewChild<ElementRef<HTMLElement>>('navRef');
  colorPaletteService = inject(ColorPaletteService);
  colorPalette = this.colorPaletteService.colorPalette_;
  menuItems = input<SidemenuItemProps[]>([]);
  toolbarRef = input<ToolbarComponent>();
  backgroundColor = input<string>();
  color = input<string>('#000000');
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

  toggleMenu() {
    this.isOpen.update((open) => !open);
  }

  ngOnInit() {
    this.top.set(this.initialTop());
  }
}
