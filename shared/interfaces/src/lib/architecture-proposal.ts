import { SafeHtml } from '@angular/platform-browser';
export interface ArchitectureProposal {
  projectNeedsSummary: ProjectNeedsSummary;
  architecture: Architecture;
  securityAndCompliance: IntegrationStrategy;
  integrationStrategy: IntegrationStrategy;
  performanceAndAvailability: IntegrationStrategy;
  assumptionsAndRisks: AssumptionsAndRisks;
  diagram: Diagram;
  intakeId?: string;
  id: string;
}

export interface Architecture {
  title: string;
  details: string;
}

export interface AssumptionsAndRisks {
  assumptions: string;
  risks: string;
  clarificationsNeeded: string;
}

export interface Diagram {
  mermaid: string | SafeHtml;

  nodeExplanations: Array<NodeExplanations>;
}

export interface NodeExplanations {
  [key: string]: string;
}

export interface IntegrationStrategy {
  description: string;
}

export interface ProjectNeedsSummary {
  businessGoals: string;
  technicalRequirements: string;
  complianceConstraints: string;
}
