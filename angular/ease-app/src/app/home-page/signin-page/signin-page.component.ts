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
  SnackbarService,
  SvgIconComponent,
} from '@ease-angular/ui';

@Component({
  selector: 'app-signin-page',
  imports: [
    CommonModule,
    FormfieldComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule,
    SvgIconComponent,
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await this.firebaseAuth.signin(email, password);
      this.router.navigate(['/', 'lobby']);
      this.isLoading.set(false);

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
