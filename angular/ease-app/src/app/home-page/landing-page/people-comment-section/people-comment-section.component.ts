import { SvgIconComponent } from '@ease-angular/ui';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

interface CommentCardProps {
  icon: string;
  comment: string;
  role: string;
  company: string;
}

@Component({
  selector: 'ease-people-comment-section',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './people-comment-section.component.html',
  styleUrl: './people-comment-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleCommentSectionComponent {
  cardProps: CommentCardProps[] = [
    {
      icon: 'comment',
      comment:
        '“EASE has completely transformed how we deliver enterprise architecture reviews. Everything’s centralized, traceable, and efficient.”',
      role: 'Senior Architect',
      company: 'IRCC',
    },
    {
      icon: 'comment',
      comment:
        '“It used to take weeks to process advisory requests. With EASE, it’s seamless — the intake form is smart and responsive.”',
      role: 'Program Mnager',
      company: 'IRCC',
    },
    {
      icon: 'comment',
      comment:
        '“Having the service catalog integrated into governance saves us so much time. This is a game-changer for digital delivery.”',
      role: 'Director',
      company: 'Cloud CoE',
    },
  ];
}
