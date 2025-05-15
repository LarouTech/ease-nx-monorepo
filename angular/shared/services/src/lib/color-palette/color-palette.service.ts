import { Injectable, signal } from '@angular/core';
import { COLOR_PALETTE_DEFAULT } from './default.palette.const';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  highlight: string;
  gray: string;
  lightGray: string;
  lighterGray: string;
  success: string;
  warning: string;
  error: string;
  darkGray: string;
}

@Injectable({
  providedIn: 'root',
})
export class ColorPaletteService {
  colorPalette_ = signal<ColorPalette>(COLOR_PALETTE_DEFAULT);

  setColorPalette(palette: ColorPalette = COLOR_PALETTE_DEFAULT) {
    for (const [key, value] of Object.entries(palette)) {
      document.documentElement.style.setProperty(`--${key}`, value);
    }

    this.colorPalette_.set(palette);
  }
}
