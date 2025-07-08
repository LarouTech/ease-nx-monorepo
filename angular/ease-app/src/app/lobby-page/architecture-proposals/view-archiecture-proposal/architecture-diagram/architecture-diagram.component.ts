import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  type OnInit,
} from '@angular/core';
import { ArchitectureProposal } from '@ease/interfaces';

@Component({
  selector: 'architecture-diagram',
  imports: [CommonModule],
  templateUrl: './architecture-diagram.component.html',
  styleUrl: './architecture-diagram.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureDiagramComponent {
  architectureProposal = input.required<ArchitectureProposal>();
}
