import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ColorPaletteService } from '@ease-angular/services';

@Component({
  selector: 'ease-why-ease-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-ease-section.component.html',
  styleUrl: './why-ease-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyEaseSectionComponent {
  private colorPaletteService = inject(ColorPaletteService);
  colorPalette = this.colorPaletteService.colorPalette_;
}
