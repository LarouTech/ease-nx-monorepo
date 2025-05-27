import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  type OnInit,
} from '@angular/core';

@Component({
  selector: 'lobby-sub-page-layout',
  imports: [CommonModule],
  templateUrl: './lobby-sub-page-layout.component.html',
  styleUrl: './lobby-sub-page-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbySubPageLayoutComponent {
  title = input.required<string>();
}
