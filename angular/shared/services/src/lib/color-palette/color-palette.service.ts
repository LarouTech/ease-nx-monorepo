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

const LOCAL_STORAGE_KEY = 'app-color-palette';

@Injectable({
  providedIn: 'root',
})
export class ColorPaletteService {
  private storedPalette = this.loadPaletteFromStorage();

  private colorPalette_ = signal<ColorPalette>(this.storedPalette);

  constructor() {
    this.applyPalette(this.storedPalette);
  }

  loadPaletteFromStorage(): ColorPalette {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : null;
      // Basic shape validation (optional)
      if (parsed && parsed.primary && parsed.secondary) {
        return parsed;
      }
    } catch {
      // Fallback to default if parsing fails
    }
    return COLOR_PALETTE_DEFAULT;
  }

  applyPalette(palette: ColorPalette): void {
    Object.entries(palette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }

  setColorPalette(palette: ColorPalette = COLOR_PALETTE_DEFAULT): void {
    this.colorPalette_.set(palette);
    this.applyPalette(palette);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(palette));
  }

  getColorPalette(): ColorPalette {
    return this.colorPalette_();
  }
}
