import { SNACKBAR_DATA, SnackbarConfig } from './snackbar.service';
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'ui-snackbar',
  templateUrl: './snackbar.component.html',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
})
export class SnackbarComponent {
  constructor(@Inject(SNACKBAR_DATA) public config: SnackbarConfig) {}
}
