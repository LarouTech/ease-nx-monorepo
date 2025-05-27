import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { COLOR_PALETTE, DARK_COLOR_PALETTE } from '../color.palette';
import { provideColorPalettes, provideFirebase } from '@ease-angular/services';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideColorPalettes(COLOR_PALETTE, DARK_COLOR_PALETTE),
    provideFirebase(environment.firebaseConfig),
  ],
};
