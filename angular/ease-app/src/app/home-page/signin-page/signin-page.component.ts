import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  ColorPaletteService,
  FirebaseAuthService,
} from '@ease-angular/services';
import {
  ButtonComponent,
  FormfieldComponent,
  FullScreenSpinnerComponent,
  SnackbarService,
  SvgIconComponent,
} from '@ease-angular/ui';
import { simulateDelay } from '@ease/utils';

@Component({
  selector: 'app-signin-page',
  imports: [
    CommonModule,
    FormfieldComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule,
    SvgIconComponent,
    FullScreenSpinnerComponent,
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent {
  private firebaseAuth = inject(FirebaseAuthService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private colorService = inject(ColorPaletteService);

  isDarkMode_ = this.colorService.isDarkMode;
  isLoading = signal(false);
  isFullSpinnerLoading = signal(false);

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  async onSignin() {
    this.isLoading.set(true);
    const getControlValue = (name: string) => {
      return this.signinForm.get(name)?.value;
    };

    const email = getControlValue('email');
    const password = getControlValue('password');
    const confirmPassword = getControlValue('confirmPassword');

    if (password !== confirmPassword) {
      this.snackbar.show({ message: 'password not matching', type: 'warning' });
      return;
    }

    try {
      await simulateDelay(2000);
      this.isLoading.set(false);
      this.isFullSpinnerLoading.set(true);

      const response = await this.firebaseAuth.signin(email, password);
      this.router.navigate(['/', 'lobby']);
      this.isFullSpinnerLoading.set(false);
      return response;
    } catch (error) {
      this.snackbar.show({
        message:
          'Signin failed. Please check your credentials or try again later',
        type: 'error',
      });
      this.isLoading.set(false);
      return error;
    }
  }
}
