import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvgIconComponent } from '@ease-angular/ui';

@Component({
  selector: 'portfolio-card',
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './portfolio-card.component.html',
  styleUrl: './portfolio-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioCardComponent {
  @Input() ownerName = 'Jane Doe';
  @Input() ownerRole = 'Product Owner';
  @Input() intakeRequests: { id: string; title: string; link: string }[] = [];
}
