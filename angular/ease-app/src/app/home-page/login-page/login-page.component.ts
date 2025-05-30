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
  FullScreenSpinnerComponent,
  SnackbarService,
  SvgIconComponent,
} from '@ease-angular/ui';
import { simulateDelay } from '@ease/utils';

@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    FormfieldComponent,
    ButtonComponent,
    RouterModule,
    ReactiveFormsModule,
    SvgIconComponent,
    FullScreenSpinnerComponent,
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
  isFullSpinnerLoading = signal(false);

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
      await simulateDelay(1000);
      this.isLoading.set(false);

      this.isFullSpinnerLoading.set(true);
      await simulateDelay(3000);

      const response = await this.firebaseAuth.login(email, password);

      this.router.navigate(['/', 'lobby']);
      this.isFullSpinnerLoading.set(false);
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
