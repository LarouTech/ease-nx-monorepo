import { bootstrapApplication } from '@angular/platform-browser';
import { runInInjectionContext, inject } from '@angular/core';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { COLOR_PALETTE } from './color.palette';
import { ColorPaletteService } from '@ease-angular/services';

async function main() {
  const appRef = await bootstrapApplication(AppComponent, appConfig);

  runInInjectionContext(appRef.injector, () => {
    const colorPaletteService = inject(ColorPaletteService);
    colorPaletteService.setColorPalette(COLOR_PALETTE);
  });
}

main().catch((err) => console.error(err));
