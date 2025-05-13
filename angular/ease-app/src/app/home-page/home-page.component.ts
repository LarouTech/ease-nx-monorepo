import { auth } from '@ease/utils';
import {
  ButtonComponent,
  FormfieldComponent,
  SnackbarService,
  SvgIconComponent,
} from '@ease-angular/ui';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EASE_COLORS } from '@ease/const';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    FormfieldComponent,
    SvgIconComponent,
    ButtonComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  easeColor = EASE_COLORS;

  private snackbarService = inject(SnackbarService);

  ngOnInit() {
    this.snackbarService.show({
      message: 'Saved successfully!',
      type: 'success',
      duration: 4000,
      backgroundColor: 'black',
      color: 'aqua',
      icon: 'settings',
    });
  }

  onValueChanged(value: string) {
    console.log('Value changed:', value);
  }
}
