import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ColorPaletteService } from '@ease-angular/services';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'full-screen-spinner',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './full-screen-spinner.component.html',
  styleUrl: './full-screen-spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
    ]),
  ],
})
export class FullScreenSpinnerComponent implements OnDestroy {
  private colorService = inject(ColorPaletteService);

  visible = input<boolean>(false);
  message = input<string>('Please wait...');
  actionsMessages = input<string[]>([]);
  topOffset = input<string>('0px');

  currentActionMessage = signal<string>('');
  isDarkMode_ = this.colorService.isDarkMode;

  index = 0;
  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor() {
    effect(() => {
      this.updateActionMessageInterval();
    });
  }

  private updateActionMessageInterval() {
    if (this.visible()) {
      this.currentActionMessage.set(this.actionsMessages()[this.index]);

      this.intervalId = setInterval(() => {
        this.index++;
        if (this.index < this.actionsMessages().length) {
          this.currentActionMessage.set(this.actionsMessages()[this.index]);
        } else {
          clearInterval(this.intervalId);
        }
      }, 1000);
    } else {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
