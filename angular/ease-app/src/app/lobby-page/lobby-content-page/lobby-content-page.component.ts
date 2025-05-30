import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  LobbySubPageLayoutComponent,
  NavSubPagesComponent,
  SvgIconComponent,
} from '@ease-angular/ui';
import { EASE_FEATURE_CARDS_PROPS } from './feature-card-props.const';
import { ProfileService } from '@ease-angular/services';

@Component({
  selector: 'app-lobby-content-page',
  imports: [CommonModule, SvgIconComponent, LobbySubPageLayoutComponent],
  templateUrl: './lobby-content-page.component.html',
  styleUrl: './lobby-content-page.component.css',
})
export class LobbyContentPageComponent {
  private profileSrevice = inject(ProfileService);
  profile_ = this.profileSrevice.profile_;

  easeFeatureCardsProps = EASE_FEATURE_CARDS_PROPS;
}
