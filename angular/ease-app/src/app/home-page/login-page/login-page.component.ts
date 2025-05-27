import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormfieldComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule,
    SvgIconComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private firebaseAuth = inject(FirebaseAuthService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private colorService = inject(ColorPaletteService);

  isDarkMode_ = this.colorService.isDarkMode;

  isLoading = signal(false);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async onLogin() {
    this.isLoading.set(true);

    const getControlValue = (name: string) => {
      return this.loginForm.get(name)?.value;
    };

    const email = getControlValue('email');
    const password = getControlValue('password');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await this.firebaseAuth.login(email, password);
      console.log(response);
      this.isLoading.set(false);
      this.router.navigate(['/', 'lobby']);
      return response;
    } catch (error) {
      console.log((error as Error).message);
      this.snackbar.show({
        message: 'Login failed. Invalid credentails.',
        type: 'error',
      });
      this.isLoading.set(false);
      return error;
    }
  }
}
