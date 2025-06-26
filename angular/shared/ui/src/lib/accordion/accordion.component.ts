import { Component, input, signal } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'accordion',
  imports: [SvgIconComponent],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  animations: [
    trigger('expandCollapse', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      transition('open <=> closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class AccordionComponent {
  title = input.required<string>();
  iconName = input<string>('chevron-down');
  isOpen = signal(false);

  onToggle() {
    this.isOpen.set(!this.isOpen());
  }
}
