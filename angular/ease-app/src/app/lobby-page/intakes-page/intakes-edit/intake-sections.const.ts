import { Intake } from '@ease-angular/services';
import { IntakeDto } from '@ease/dto';

export interface IntakeSection {
  title: string;
  name: string;
  isEditMode?: boolean;
  fields: Array<{
    label: string;
    value: string | string[];
    isArray?: boolean;
    isReset?: boolean;
  }>;
}

export const intakeSections = (intake: IntakeDto): IntakeSection[] => {
  return [
    {
      title: 'requestor information',
      name: 'requestorInformation',
      isEditMode: false,
      fields: [
        { label: 'name', value: intake.requestorInformation.name },
        { label: 'title', value: intake.requestorInformation.title },
        { label: 'branch', value: intake.requestorInformation.branch },
        { label: 'email', value: intake.requestorInformation.email },
        { label: 'phone', value: intake.requestorInformation.phone },
      ],
    },
    {
      title: 'business context',
      name: 'businessContext',
      isEditMode: false,
      fields: [
        { label: 'initiative', value: intake.businessContext.initiative },
        {
          label: 'business driver',
          value: intake.businessContext.businessDriver,
        },
        {
          label: 'problem statement',
          value: intake.businessContext.problemStatement,
        },
        {
          label: 'impact if not implemented',
          value: intake.businessContext.impactIfNotImpelemented,
        },
        { label: 'deadline', value: intake.businessContext.deadline },
        {
          label: 'is deadline regulatory',
          value: intake.businessContext.isDeadlineOrRegulatory,
        },
        {
          label: 'is part of larger initiative',
          value: intake.businessContext.isPartOfLargerInitative,
        },
      ],
    },
    {
      title: 'project details',
      name: 'projectDetails',
      isEditMode: false,
      fields: [
        { label: 'initiative', value: intake.projectDetails.initiativeName },
        {
          label: 'current pain points',
          value: intake.projectDetails.currentPainPoints,
        },
        {
          label: 'type of request',
          value: intake.projectDetails.typeOfRequest,
        },
        {
          label: 'target users & stakeholders',
          value: intake.projectDetails.targetUsersAndStakeholders,
        },
        {
          label: 'number of users',
          value: intake.projectDetails.numberOfEndUsers,
        },
        {
          label: 'solution description',
          value: intake.projectDetails.solutionDescription,
        },
        {
          label: 'is solution already identified',
          value: intake.projectDetails.isSolutionAlreadyIdentified,
        },
        {
          label: 'is existing tools or platforms considered',
          value: intake.projectDetails.isExisitingToolsOrPlatformsConsidered,
        },
        {
          label: 'is vendor already identified',
          value: intake.projectDetails.isVendorAlreadyIdentified,
        },
      ],
    },
    {
      title: 'financial & procurement',
      name: 'financialAndProcurement',
      isEditMode: false,
      fields: [
        {
          label: 'financial approval',
          value: intake.financialAndProcurement.describeApprovals,
        },
        {
          label: 'finacial dependencies',
          value: intake.financialAndProcurement.describeDependencies,
        },
        {
          label: 'all approval obtained',
          value: intake.financialAndProcurement.isAllApprovalsObtained,
        },
        {
          label: 'approval pending',
          value: intake.financialAndProcurement.isApprovalsPending,
        },
        {
          label: 'archiecture review completed',
          value: intake.financialAndProcurement.isArchietureReviewCompleted,
        },
      ],
    },
    {
      title: 'timeline & delivery',
      name: 'timelineAndDelivery',
      isEditMode: false,
      fields: [
        {
          label: 'level of urgency',
          value: intake.timelineAndDelivery.levelOfUrgency,
        },
        {
          label: 'requested strat date',
          value: intake.timelineAndDelivery.requestedStartDate,
        },
        {
          label: 'target go-live date',
          value: intake.timelineAndDelivery.targetGoLiveDate,
        },
        {
          label: 'is hard deadline',
          value: intake.timelineAndDelivery.isHardDeadline,
        },
        {
          label: 'hard deadline details',
          value: intake.timelineAndDelivery.hardDeadlineDetails,
        },
        {
          label: 'is linked to external intiative',
          value: intake.timelineAndDelivery.isLinkedToExternalInitiative,
        },
        {
          label: 'external intiative details',
          value: intake.timelineAndDelivery.externalInitiativeDetails,
        },
        {
          label: 'delevery model',
          value: intake.timelineAndDelivery.deliveryModel,
        },
      ],
    },
    {
      title: 'data & security',
      name: 'dataAndSecurity',
      isEditMode: false,
      fields: [
        {
          label: 'data storage location',
          value: intake.dataAndSecurity.dataStorageLocation,
        },
        {
          label: 'data type stored',
          value: intake.dataAndSecurity.dataTypeStored,
          isArray: true,
        },
        {
          label: 'compliance requirements',
          value: intake.dataAndSecurity.complianceRequirements,
          isArray: true,
        },
        {
          label: 'is Data stored or transmit externally',
          value: intake.dataAndSecurity.isDataStoreOrTransmitExternally,
        },
        {
          label: 'is encription at rest',
          value: intake.dataAndSecurity.isEncryptionAtRest,
        },
        {
          label: 'is encription in transit',
          value: intake.dataAndSecurity.isEncryptionInTransit,
        },
        {
          label: 'is personal information involved',
          value: intake.dataAndSecurity.isPersonalInformationInvolved,
        },
        {
          label: 'is remote access required',
          value: intake.dataAndSecurity.isRemoteAccessRequire,
        },
        {
          label: 'is secuirty & threat assessemtn required',
          value: intake.dataAndSecurity.isSecurityThreatAndRiskAssessment,
        },
      ],
    },
    {
      title: 'technical considerations',
      name: 'technicalConsiderations',
      isEditMode: false,
      fields: [
        {
          label: 'anticipated hosting location',
          value: intake.technicalConsiderations.anticipatedHostingLocation,
        },
        {
          label: 'anticipated volume or load',
          value: intake.technicalConsiderations.anticipatedVolumeOrLoad,
        },
        {
          label: 'authentication & authorization',
          value:
            intake.technicalConsiderations.authenticationAndAuthorizationNeeds,
        },
        {
          label: 'authentication & authorization details',
          value:
            intake.technicalConsiderations
              .authenticationAndAuthorizationNeedsElaborate,
        },
        {
          label: 'data classification',
          value: intake.technicalConsiderations.dataClassificationLevel,
        },
        {
          label: 'data storage unit',
          value: intake.technicalConsiderations.dataStorageUnit,
        },
        {
          label: 'dependency on legacy systems',
          value: intake.technicalConsiderations.dependencyOnLegacySystems,
        },
        {
          label: 'dependecy on legacy systems details',
          value: intake.technicalConsiderations.dependencyOnLegacySystemsMore,
        },
        {
          label: 'DR & BCP requirements',
          value:
            intake.technicalConsiderations
              .disasterRecoveryBusinessContinuityNeeds,
        },
        {
          label: 'DR & BCP requirements details',
          value:
            intake.technicalConsiderations
              .disasterRecoveryBusinessContinuityNeedsMore,
        },
        {
          label: 'does it require internet access',
          value: intake.technicalConsiderations.doesItRequireInternetAccess,
        },
        {
          label: 'estimate storage requirements',
          value:
            intake.technicalConsiderations.estimatedDataStorageRequirements,
        },
        {
          label: 'expected environments',
          value: intake.technicalConsiderations.expectedEnvironments,
          isArray: true,
        },
        {
          label: 'integration requirements',
          value: intake.technicalConsiderations.integrationRequirements,
        },
        {
          label: 'performance & availibility requirements',
          value:
            intake.technicalConsiderations
              .performanceOrAvailibilityRequirements,
        },
        {
          label: 'security considerations or constraints',
          value:
            intake.technicalConsiderations.securityConsiderationsOrConstraints,
        },
      ],
    },
    {
      title: 'dependecies  & approvals',
      name: 'dependenciesAndApprovals',
      isEditMode: false,
      fields: [
        {
          label: 'approval status',
          value: intake.dependenciesAndApprovals.describeApprovals,
        },
        {
          label: 'is there any dependencies',
          value: intake.dependenciesAndApprovals.isDependencies,
        },
        {
          label: 'dependecies details',
          value: intake.dependenciesAndApprovals.describeDependencies,
        },
        {
          label: 'approval obtained',
          value: intake.dependenciesAndApprovals.isAllApprovalsObtained,
        },
        {
          label: 'approval pending',
          value: intake.dependenciesAndApprovals.isApprovalsPending,
        },
        {
          label: 'architecture review completed',
          value: intake.dependenciesAndApprovals.isArchietureReviewCompleted,
        },
        {
          label: 'is governance support required',
          value: intake.dependenciesAndApprovals.isGovernanceSupportNeeds,
        },
      ],
    },
  ];
};
