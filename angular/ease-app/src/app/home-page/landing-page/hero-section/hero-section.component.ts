import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorPaletteService } from '@ease-angular/services';
import { ButtonComponent } from '@ease-angular/ui';

@Component({
  selector: 'ease-hero-section',
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  // colorPalatteService = inject(ColorPaletteService);
  // colorPalette = this.colorPalatteService.colorPalette_;
}
