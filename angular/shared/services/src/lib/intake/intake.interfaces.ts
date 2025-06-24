import { IntakeDto } from '@ease/dto';
export interface Intake extends IntakeDto {
  ownerId: string;
  createdOn: Date;
  familyName?: string;
  givenName?: string;
  email: string;
  id?: string;
}

// export interface IntakeDto {
//   dependenciesAndApprovals: DependenciesAndApprovals; // You can type this more specifically if needed
//   requestorInformation: RequestorInformation;
//   businessContext: BusinessContext;
//   projectDetails: ProjectDetails;
//   technicalConsiderations: TechnicalConsiderations;
//   dataAndSecurity: DataAndSecurity;
//   timelineAndDelivery: TimelineAndDelivery;
//   financialAndProcurement: FinancialAndProcurement;
// }

// export interface DependenciesAndApprovals {
//   isDependencies: 'yes' | 'no';
//   describeDependencies: string;
//   isApprovalsPending: 'yes' | 'no';
//   describeApprovals: string;
//   isAllApprovalsObtained: 'yes' | 'no';
//   isGovernanceSupportNeeds: 'yes' | 'no';
//   isArchietureReviewCompleted: 'notStarted' | 'inProgress' | 'completed';
// }

// export interface RequestorInformation {
//   name: string;
//   branch: string;
//   title: string;
//   email: string;
//   phone: string;
// }

// export interface BusinessContext {
//   businessDriver: string;
//   problemStatement: string;
//   isPartOfLargerInitative: YesNo;
//   initiative: string;
//   isDeadlineOrRegulatory: YesNo;
//   deadline: string; // could be Date
//   impactIfNotImpelemented: string;
// }

// export interface ProjectDetails {
//   initiativeName: string;
//   typeOfRequest: 'cloudNativeApplication' | 'COTS' | 'other'; // add more as needed
//   solutionDescription: string;
//   targetUsersAndStakeholders: string;
//   numberOfEndUsers: string; // or number
//   isSolutionAlreadyIdentified: YesNo;
//   isVendorAlreadyIdentified: YesNo;
//   isExisitingToolsOrPlatformsConsidered: string;
//   currentPainPoints: string;
// }

// export interface TechnicalConsiderations {
//   anticipatedHostingLocation:
//     | 'publicCloud'
//     | 'privateCloud'
//     | 'onPremises'
//     | 'hybrid';
//   expectedEnvironments: ('Development' | 'Test' | 'UAT' | 'Production')[];
//   dataClassificationLevel:
//     | 'unclassified'
//     | 'protectedA'
//     | 'protectedB'
//     | 'protectedC'
//     | 'classified';
//   integrationRequirements: string;
//   authenticationAndAuthorizationNeeds:
//     | 'azureAD'
//     | 'GCKey'
//     | 'LoginCanada'
//     | 'other';
//   authenticationAndAuthorizationNeedsElaborate: string;
//   anticipatedVolumeOrLoad: string;
//   performanceOrAvailibilityRequirements: string;
//   securityConsiderationsOrConstraints: string;
//   disasterRecoveryBusinessContinuityNeeds: YesNo;
//   disasterRecoveryBusinessContinuityNeedsMore: string;
//   doesItRequireInternetAccess: YesNo;
//   dependencyOnLegacySystems: YesNo;
//   dependencyOnLegacySystemsMore: string;
//   estimatedDataStorageRequirements: string;
//   dataStorageUnit: 'megabytes' | 'gigabytes' | 'terabytes' | 'petabytes';
// }

// export interface DataAndSecurity {
//   dataTypeStored: ('HR' | 'Financial' | 'Operational' | 'Client' | 'Other')[];
//   isPersonalInformationInvolved: YesNo;
//   isDataStoreOrTransmitExternally: YesNo;
//   dataStorageLocation: 'canada' | 'usa' | 'international' | 'unsure';
//   isEncryptionAtRest: YesNo;
//   isEncryptionInTransit: YesNo;
//   complianceRequirements: (
//     | 'GC Accesbility'
//     | 'PIPEDA'
//     | 'GDPR'
//     | 'Official Languages Act'
//   )[];
//   isSecurityThreatAndRiskAssessment: YesNo;
//   isRemoteAccessRequire: YesNo;
// }

// export interface TimelineAndDelivery {
//   requestedStartDate: string;
//   targetGoLiveDate: string;
//   isHardDeadline: YesNo;
//   hardDeadlineDetails: string;
//   isLinkedToExternalInitiative: YesNo;
//   externalInitiativeDetails: string;
//   levelOfUrgency: 'low' | 'medium' | 'high' | 'critical';
//   deliveryModel: 'agile' | 'waterfall' | 'hybrid';
// }

// export interface FinancialAndProcurement {
//   isDependencies: YesNo;
//   describeDependencies: string;
//   isApprovalsPending: YesNo;
//   describeApprovals: string;
//   isAllApprovalsObtained: YesNo;
//   isGovernanceSupportNeeds: YesNo;
//   isArchietureReviewCompleted: 'notStarted' | 'inProgress' | 'completed';
// }

// export type YesNo = 'yes' | 'no';
