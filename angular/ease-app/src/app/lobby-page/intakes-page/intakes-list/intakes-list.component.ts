import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { LobbySubPageLayoutComponent } from '@ease-angular/ui';

@Component({
  selector: 'app-intakes-list',
  imports: [CommonModule, LobbySubPageLayoutComponent],
  templateUrl: './intakes-list.component.html',
  styleUrl: './intakes-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesListComponent {}
