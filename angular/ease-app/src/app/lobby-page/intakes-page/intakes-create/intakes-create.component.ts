import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { LobbySubPageLayoutComponent } from '@ease-angular/ui';

@Component({
  selector: 'app-intakes-create',
  imports: [CommonModule, LobbySubPageLayoutComponent],
  templateUrl: './intakes-create.component.html',
  styleUrl: './intakes-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntakesCreateComponent {}
