import {
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { EASE_COLORS } from '@ease/const';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

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
  menuItems = input<SidemenuItemProps[]>([]);
  isOpen: WritableSignal<boolean> = signal(true);
  toolbarRef = input<ToolbarComponent>();
  // easeColor = EASE_COLORS;

  backgroundColor = input<string>(EASE_COLORS.background);
  color = input<string>(EASE_COLORS.text);
  menuItemColor = input<string>('#e5e7eb');

  navRef_ = viewChild<ElementRef<HTMLElement>>('navRef');

  initialTop = computed(() => {
    const isToolbarFixed = this.toolbarRef()?.isFixed;

    if (isToolbarFixed) {
      return this.toolbarRef()?.el.nativeElement.offsetHeight;
    } else return '0';
  });

  top: WritableSignal<number> = signal(0);

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
    console.log('toggleMenu', this.isOpen());
  }

  ngOnInit() {
    this.top.set(this.initialTop());
    console.log(this.toolbarRef()?.toolbarRef());
  }
}
