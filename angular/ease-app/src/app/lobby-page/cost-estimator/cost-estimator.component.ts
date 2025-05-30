import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LobbySubPageLayoutComponent } from '@ease-angular/ui';

@Component({
  selector: 'app-cost-estimator',
  imports: [CommonModule, LobbySubPageLayoutComponent],
  templateUrl: './cost-estimator.component.html',
  styleUrl: './cost-estimator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostEstimatorComponent {}
