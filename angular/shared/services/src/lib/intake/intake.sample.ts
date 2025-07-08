import { IntakeDto } from '@ease/dto';

export const FICTIONAL_INTAKEFORM: Partial<IntakeDto> = {
  dependenciesAndApprovals: {
    isDependencies: 'yes',
    describeDependencies:
      'Dependent on the rollout of the new HRIS platform scheduled for Q3.',
    isApprovalsPending: 'yes',
    describeApprovals:
      'Awaiting final sign-off from the IT Steering Committee and Finance.',
    isAllApprovalsObtained: 'no',
    isGovernanceSupportNeeds: 'yes',
    isArchietureReviewCompleted: 'inProgress',
  },
  requestorInformation: {
    name: 'Alex Morgan',
    branch: 'Digital Transformation Branch',
    title: 'Senior Project Manager',
    email: 'alex.morgan@govmail.gc.ca',
    phone: '613-555-0198',
  },
  businessContext: {
    businessDriver: 'Support remote workforce with modern digital HR tools.',
    problemStatement:
      'The existing system is outdated, lacks integration, and doesn’t support remote onboarding.',
    isPartOfLargerInitative: 'yes',
    initiative: 'Enterprise HR Modernization Program',
    isDeadlineOrRegulatory: 'yes',
    deadline: '2025-09-30',
    impactIfNotImpelemented:
      'Delays in onboarding new hires and inability to meet accessibility compliance.',
  },
  projectDetails: {
    initiativeName: 'NextGen HR Portal',
    typeOfRequest: 'cloudNativeApplication',
    solutionDescription:
      'A secure cloud-native application for onboarding, profile management, and training.',
    targetUsersAndStakeholders:
      'HR staff, new employees, People Management Directorate, and Shared Services Canada.',
    numberOfEndUsers: '1200',
    isSolutionAlreadyIdentified: 'yes',
    isVendorAlreadyIdentified: 'no',
    isExisitingToolsOrPlatformsConsidered:
      'Yes, alternatives like SAP SuccessFactors and Workday were evaluated.',
    currentPainPoints:
      'Manual processes, multiple logins, inconsistent user experience, no mobile support.',
  },
  technicalConsiderations: {
    anticipatedHostingLocation: 'publicCloud',
    expectedEnvironments: ['Development', 'Test', 'UAT', 'Production'],
    dataClassificationLevel: 'protectedB',
    integrationRequirements:
      'Integration with Active Directory, Finance, and Payroll systems.',
    authenticationAndAuthorizationNeeds: 'azureAD',
    authenticationAndAuthorizationNeedsElaborate:
      'Azure AD with MFA and role-based access control for HR managers.',
    anticipatedVolumeOrLoad:
      'Approximately 500 daily transactions during peak onboarding periods.',
    performanceOrAvailibilityRequirements:
      '99.9% availability, page load under 2 seconds for all major features.',
    securityConsiderationsOrConstraints:
      'Must adhere to ITSG-33 and GC cloud security controls.',
    disasterRecoveryBusinessContinuityNeeds: 'yes',
    disasterRecoveryBusinessContinuityNeedsMore:
      'Daily backups, active-active multi-region setup, 4-hour RTO.',
    doesItRequireInternetAccess: 'yes',
    dependencyOnLegacySystems: 'yes',
    dependencyOnLegacySystemsMore:
      'Currently reads legacy data from PeopleSoft system.',
    estimatedDataStorageRequirements: '500',
    dataStorageUnit: 'gigabytes',
  },
  dataAndSecurity: {
    dataTypeStored: ['HR', 'Operational', 'Client'],
    isPersonalInformationInvolved: 'yes',
    isDataStoreOrTransmitExternally: 'yes',
    dataStorageLocation: 'canada',
    isEncryptionAtRest: 'yes',
    isEncryptionInTransit: 'yes',
    complianceRequirements: [
      'GC Accesbility',
      'PIPEDA',
      'Official Languages Act',
    ],
    isSecurityThreatAndRiskAssessment: 'yes',
    isRemoteAccessRequire: 'yes',
  },
  timelineAndDelivery: {
    requestedStartDate: '2025-07-15',
    targetGoLiveDate: '2026-01-15',
    isHardDeadline: 'yes',
    hardDeadlineDetails:
      'Go-live must align with Q4 hiring surge and fiscal reporting deadlines.',
    isLinkedToExternalInitiative: 'yes',
    externalInitiativeDetails:
      'Aligned with IRCC’s Strategic Workforce Initiative and GC Digital Talent Platform.',
    levelOfUrgency: 'high',
    deliveryModel: 'agile',
  },
  financialAndProcurement: {
    isDependencies: 'yes',
    describeDependencies:
      'Dependent on SaaS licensing and cloud infrastructure funding approval.',
    isApprovalsPending: 'yes',
    describeApprovals:
      'Pending ADM-level approval for the budget reallocation.',
    isAllApprovalsObtained: 'no',
    isGovernanceSupportNeeds: 'yes',
    isArchietureReviewCompleted: 'inProgress',
  },
};
