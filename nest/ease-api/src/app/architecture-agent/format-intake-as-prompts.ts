import { IntakeDto } from '@ease/dto';

export default (intake: IntakeDto) => {
  return `
    ## Project: ${intake.projectDetails.initiativeName}
    
    ### Business Context
    - Driver: ${intake.businessContext.businessDriver}
    - Problem: ${intake.businessContext.problemStatement}
    - Initiative: ${intake.businessContext.initiative}
    - Deadline: ${intake.businessContext.deadline}
    - Impact if not implemented: ${
      intake.businessContext.impactIfNotImpelemented
    }
    
    ### Technical Requirements
    - Hosting: ${intake.technicalConsiderations.anticipatedHostingLocation}
    - Environments: ${intake.technicalConsiderations.expectedEnvironments.join(
      ', '
    )}
    - Data Classification: ${
      intake.technicalConsiderations.dataClassificationLevel
    }
    - Authentication: ${
      intake.technicalConsiderations
        .authenticationAndAuthorizationNeedsElaborate
    }
    - Load: ${intake.technicalConsiderations.anticipatedVolumeOrLoad}
    - Availability Requirement: ${
      intake.technicalConsiderations.performanceOrAvailibilityRequirements
    }
    - Integration Needs: ${
      intake.technicalConsiderations.integrationRequirements
    }
    - Disaster Recovery: ${
      intake.technicalConsiderations.disasterRecoveryBusinessContinuityNeedsMore
    }
    - Internet Access Required: ${
      intake.technicalConsiderations.doesItRequireInternetAccess
    }
    - Legacy Dependencies: ${
      intake.technicalConsiderations.dependencyOnLegacySystemsMore
    }
    - Data Storage Estimate: ${
      intake.technicalConsiderations.estimatedDataStorageRequirements
    } ${intake.technicalConsiderations.dataStorageUnit}
    
    ### Data & Security
    - Data Types: ${intake.dataAndSecurity.dataTypeStored.join(', ')}
    - Personal Info: ${intake.dataAndSecurity.isPersonalInformationInvolved}
    - External Storage: ${
      intake.dataAndSecurity.isDataStoreOrTransmitExternally
    }
    - Storage Location: ${intake.dataAndSecurity.dataStorageLocation}
    - Encryption: At Rest: ${
      intake.dataAndSecurity.isEncryptionAtRest
    }, In Transit: ${intake.dataAndSecurity.isEncryptionInTransit}
    - Compliance Requirements: ${intake.dataAndSecurity.complianceRequirements.join(
      ', '
    )}
    - Remote Access: ${intake.dataAndSecurity.isRemoteAccessRequire}
    
    ### Project Delivery
    - Delivery Model: ${intake.timelineAndDelivery.deliveryModel}
    - Target Go-Live: ${intake.timelineAndDelivery.targetGoLiveDate}
    - Urgency: ${intake.timelineAndDelivery.levelOfUrgency}
    - Hard Deadline Details: ${intake.timelineAndDelivery.hardDeadlineDetails}
    - External Initiative Alignment: ${
      intake.timelineAndDelivery.externalInitiativeDetails
    }
    
    ### Financial and Governance
    - Procurement Dependencies: ${
      intake.financialAndProcurement.describeDependencies
    }
    - Pending Approvals: ${intake.financialAndProcurement.describeApprovals}
    - Governance Needs: ${
      intake.financialAndProcurement.isGovernanceSupportNeeds
    }
    `;
};
