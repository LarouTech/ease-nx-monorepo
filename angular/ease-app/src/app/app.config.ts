import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  DARK_PALETTE_TOKEN,
  LIGHT_PALETTE_TOKEN,
} from '@ease-angular/services';
import { COLOR_PALETTE, DARK_COLOR_PALETTE } from '../color.palette';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LIGHT_PALETTE_TOKEN, useValue: COLOR_PALETTE },
    { provide: DARK_PALETTE_TOKEN, useValue: DARK_COLOR_PALETTE },
  ],
};
