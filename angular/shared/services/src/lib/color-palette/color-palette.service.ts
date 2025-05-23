import { Inject, Injectable, signal, computed } from '@angular/core';
import { DARK_PALETTE_TOKEN, LIGHT_PALETTE_TOKEN } from './color-palette.token';

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
const DARK_MODE_KEY = 'isDarkMode';

@Injectable({ providedIn: 'root' })
export class ColorPaletteService {
  private isDarkMode_ = signal(false);
  private colorPalette_ = signal<ColorPalette>({} as ColorPalette); // temp init

  isDarkMode = computed(() => this.isDarkMode_());

  constructor(
    @Inject(LIGHT_PALETTE_TOKEN) private lightPalette: ColorPalette,
    @Inject(DARK_PALETTE_TOKEN) private darkPalette: ColorPalette
  ) {
    // Now safe to use injected values
    const initialDarkMode = this.loadDarkModeFromStorage();
    this.isDarkMode_.set(initialDarkMode);

    const initialPalette =
      this.loadPaletteFromStorage() ??
      (initialDarkMode ? this.darkPalette : this.lightPalette);

    this.colorPalette_.set(initialPalette);
    this.applyPalette(initialPalette);
  }

  toggleDarkMode(): void {
    const darkMode = !this.isDarkMode_();
    this.isDarkMode_.set(darkMode);
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));

    const palette = darkMode ? this.darkPalette : this.lightPalette;
    this.setColorPalette(palette);
  }

  setColorPalette(palette: ColorPalette): void {
    this.colorPalette_.set(palette);
    this.applyPalette(palette);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(palette));
  }

  applyPalette(palette: ColorPalette): void {
    Object.entries(palette).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }

  getColorPalette(): ColorPalette {
    return this.colorPalette_();
  }

  private loadPaletteFromStorage(): ColorPalette | null {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : null;
      if (parsed && parsed.primary && parsed.secondary) {
        return parsed;
      }
    } catch {
      // Fallback will be handled in constructor
    }
    return null;
  }

  private loadDarkModeFromStorage(): boolean {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    return stored ? JSON.parse(stored) : false;
  }
}
