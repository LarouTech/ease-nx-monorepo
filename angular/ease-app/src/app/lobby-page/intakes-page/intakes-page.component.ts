import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ColorPaletteService } from '@ease-angular/services';

@Component({
  selector: 'app-intakes-page',
  imports: [CommonModule],
  templateUrl: './intakes-page.component.html',
  styleUrl: './intakes-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesPageComponent {
  private colorService = inject(ColorPaletteService);

  darkPalette = this.colorService.darkPalette;
  lightPalette = this.colorService.lightPalette;

  ngOnInit() {
    console.log([this.darkPalette, this.lightPalette]);
  }
}
