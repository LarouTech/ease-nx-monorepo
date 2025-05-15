import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FirebaseAuthService } from '@ease-angular/services';
import {
  ButtonComponent,
  FormfieldComponent,
  SnackbarService,
} from '@ease-angular/ui';

@Component({
  selector: 'app-signin-page',
  imports: [
    CommonModule,
    FormfieldComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent {
  private firebaseAuth = inject(FirebaseAuthService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  async onSignin() {
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
      const response = await this.firebaseAuth.signin(email, password);
      this.router.navigate(['/', 'lobby']);
      return response;
    } catch (error) {
      this.snackbar.show({
        message:
          'Signin failed. Please check your credentials or try again later',
        type: 'error',
      });
      return error;
    }
  }
}
