import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ColorPaletteService } from '@ease-angular/services';

@Component({
  selector: 'ease-people-comment-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './people-comment-section.component.html',
  styleUrl: './people-comment-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleCommentSectionComponent {
  private colorPaletteService = inject(ColorPaletteService);
  colorPalette = this.colorPaletteService.colorPalette_;
}
