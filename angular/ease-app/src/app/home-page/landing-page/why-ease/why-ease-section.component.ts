import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SvgIconComponent } from '@ease-angular/ui';

interface WhyEaseCardProps {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'ease-why-ease-section',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './why-ease-section.component.html',
  styleUrl: './why-ease-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhyEaseSectionComponent {
  cardProps: WhyEaseCardProps[] = [
    {
      icon: 'stack',
      title: 'Unified Governance',
      description:
        'Streamline EA workflows and approvals with traceable decision gates and structured review steps.',
    },
    {
      icon: 'support',
      title: 'Advisory Support',
      description:
        'Request, track, and manage EA advisory engagements with configurable intake and response tools.',
    },
    {
      icon: 'book',
      title: 'Service Catalogue',
      description:
        'Browse and request EA and CCOE services from a curated, self-serve catalog — fully integrated with governance workflows.',
    },
    {
      icon: 'integration',
      title: 'Seamless Integration',
      description:
        'Connect easily with other enterprise tools like GitHub, Teams, or Jira to support end-to-end delivery pipelines.',
    },
    {
      icon: 'stastics',
      title: 'Metrics & Insights',
      description:
        'Monitor service usage, identify bottlenecks, and track governance KPIs across your architecture ecosystem.',
    },
    {
      icon: 'standard',
      title: 'Standards & Consistency',
      description:
        'Promote alignment to enterprise standards and reusable patterns across teams and projects.',
    },
  ];
}
