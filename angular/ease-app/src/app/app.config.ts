import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { COLOR_PALETTE, DARK_COLOR_PALETTE } from '../color.palette';
import {
  APP_ENVIRONMENT,
  provideColorPalettes,
  provideFirebase,
} from '@ease-angular/services';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideColorPalettes(COLOR_PALETTE, DARK_COLOR_PALETTE),
    provideFirebase(environment.firebaseConfig),
    { provide: APP_ENVIRONMENT, useValue: environment },
  ],
};
