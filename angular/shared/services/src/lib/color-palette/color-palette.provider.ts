import { Provider } from '@angular/core';
import { ColorPalette } from './color-palette.service';
import { DARK_PALETTE_TOKEN, LIGHT_PALETTE_TOKEN } from './color-palette.token';

export const provideColorPalettes = (
  lightPalette: ColorPalette,
  darkPalette: ColorPalette
): Provider => {
  return [
    { provide: LIGHT_PALETTE_TOKEN, useValue: lightPalette },
    { provide: DARK_PALETTE_TOKEN, useValue: darkPalette },
  ];
};
