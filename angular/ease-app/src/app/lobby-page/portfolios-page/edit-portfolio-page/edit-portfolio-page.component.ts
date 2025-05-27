import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LobbySubPageLayoutComponent } from '@ease-angular/ui';

@Component({
  selector: 'edit-portfolio',
  standalone: true,
  imports: [LobbySubPageLayoutComponent],
  templateUrl: './edit-portfolio-page.component.html',
  styleUrl: './edit-portfolio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPortfolioComponent {}
