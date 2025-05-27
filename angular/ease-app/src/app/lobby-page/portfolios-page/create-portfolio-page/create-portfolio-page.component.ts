import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  ColorPaletteService,
  FirestoreService,
  PortfolioService,
} from '@ease-angular/services';
import {
  ButtonComponent,
  FormfieldComponent,
  LobbySubPageLayoutComponent,
  SnackbarService,
  SvgIconComponent,
} from '@ease-angular/ui';

export interface CreatePortfolioForm {
  label: string;
  name: string;
}

@Component({
  selector: 'app-create-portfolio-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LobbySubPageLayoutComponent,
    FormfieldComponent,
    ButtonComponent,
    SvgIconComponent,
  ],
  templateUrl: './create-portfolio-page.component.html',
  styleUrl: './create-portfolio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePortfolioPageComponent {
  private colorSrevice = inject(ColorPaletteService);
  private portfolioService = inject(PortfolioService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);

  isDarkMode = this.colorSrevice.isDarkMode;
  createPortfolioFormProps: CreatePortfolioForm[] = [
    { label: 'given name', name: 'givenName' },
    { label: 'family name', name: 'familyName' },
    { label: 'portfolio name', name: 'portfolioName' },
    { label: 'position title', name: 'positionTitle' },
  ];

  creattePortfolioForm: FormGroup = new FormGroup({
    givenName: new FormControl('', Validators.required),
    familyName: new FormControl('', Validators.required),
    portfolioName: new FormControl('', Validators.required),
    positionTitle: new FormControl('', Validators.required),
  });

  async onCreatePotfolio() {
    const controlGetter = (key: string) =>
      this.creattePortfolioForm.get(key)?.value;

    const portfolio = {
      givenName: controlGetter('givenName'),
      familyName: controlGetter('familyName'),
      portfolioName: controlGetter('portfolioName'),
      positionTitle: controlGetter('positionTitle'),
      createdOn: new Date(),
    };

    const snackPromise = new Promise<void>((resolve) => {
      const duration = 3000; // duration for the snackbar
      this.snackbar.show({
        message: 'Portfolio created successfully',
        duration: duration,
        type: 'success',
      });

      setTimeout(() => {
        resolve();
      }, duration); // resolves after the snackbar duration
    });

    try {
      await this.portfolioService.createPortfolio(portfolio);
      await snackPromise;
      this.router.navigate(['/', 'lobby', 'portfolios']);
    } catch {
      this.snackbar.show({
        message: 'Error creating portfolio',
        duration: 3000,
        type: 'error',
      });
      this.creattePortfolioForm.reset();
    }
  }
}
