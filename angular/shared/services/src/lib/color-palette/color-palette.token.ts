// color-palette.tokens.ts
import { InjectionToken } from '@angular/core';
import { ColorPalette } from './color-palette.service';

export const LIGHT_PALETTE_TOKEN = new InjectionToken<ColorPalette>(
  'LIGHT_PALETTE_TOKEN'
);
export const DARK_PALETTE_TOKEN = new InjectionToken<ColorPalette>(
  'DARK_PALETTE_TOKEN'
);
