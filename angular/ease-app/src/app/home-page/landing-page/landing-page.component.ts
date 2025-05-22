import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { WhyEaseSectionComponent } from './why-ease/why-ease-section.component';
import { PeopleCommentSectionComponent } from './people-comment-section/people-comment-section.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeroSectionComponent,
    WhyEaseSectionComponent,
    PeopleCommentSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
