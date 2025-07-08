import { Injectable, Logger } from '@nestjs/common';
import { run } from '@openai/agents';
import { ArchitectureProposal } from '@ease/interfaces';
import { ArchitecturePropsalDto } from '@ease/dto';
import { FirebaseService } from '../firebase-admin/firebase.service';
import solutionArchitectAgent from './solution-architect-agent';
import formatIntakeAsPrompts from './format-intake-as-prompts';
import { MermaidFormatter } from './mermaid-formatter.service';
import { ArchiecturePlatform } from '@ease/types';

/**
 * Service for managing architecture proposals using AI agents
 */
@Injectable()
export class ArchitectureAgentService {
  private readonly logger = new Logger(ArchitectureAgentService.name);
  private readonly ARCHITECTURE_COLLECTION = 'architecture-proposal';
  private readonly INTAKES_COLLECTION = 'intakes';

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly mermaidFormatter: MermaidFormatter
  ) {}

  async deleteArchitectureProposal(
    id: string,
    intakeId: string
  ): Promise<{
    success: boolean;
    message: string;
    intakeId: string;
    id: string;
  }> {
    const firestore = this.firebaseService.getFirestore();

    try {
      // Use a transaction to ensure atomicity
      const result = await firestore.runTransaction(async (transaction) => {
        // Check if documents exist before deletion
        const archProposalRef = firestore
          .collection(this.ARCHITECTURE_COLLECTION)
          .doc(id);
        const intakeRef = firestore
          .collection(this.INTAKES_COLLECTION)
          .doc(intakeId);

        const [archProposalDoc, intakeDoc] = await Promise.all([
          transaction.get(archProposalRef),
          transaction.get(intakeRef),
        ]);

        if (!archProposalDoc.exists) {
          throw new Error(`Architecture proposal with ID ${id} does not exist`);
        }

        if (!intakeDoc.exists) {
          throw new Error(`Intake with ID ${intakeId} does not exist`);
        }

        // Perform the deletion and update atomically
        transaction.delete(archProposalRef);
        transaction.update(intakeRef, {
          archProposalId: null,
          updatedAt: new Date(),
        });

        return { archProposalId: id, intakeId };
      });

      this.logger.log(
        `Successfully deleted architecture proposal ${id} and updated intake ${intakeId}`
      );

      return {
        success: true,
        message: `Architecture proposal deleted successfully`,
        intakeId: result.intakeId,
        id: result.archProposalId,
      };
    } catch (error) {
      this.logger.error(`Failed to delete architecture proposal ${id}:`, error);

      // Re-throw with more context
      if (error instanceof Error && error.message.includes('does not exist')) {
        throw new Error(error.message);
      }

      throw new Error(
        `Failed to delete architecture proposal: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Creates a new architecture proposal based on provided intake data
   * @param dto - Architecture proposal data transfer object
   * @returns Promise<ArchitectureProposal> - The created architecture proposal
   * @throws Error if creation fails
   */
  async createArchitectureProposal(
    dto: ArchitecturePropsalDto
  ): Promise<ArchitectureProposal> {
    this.validateCreateProposalInput(dto);

    const { platform, intake } = dto;
    const prompt = formatIntakeAsPrompts(intake);

    try {
      this.logger.log(
        `Creating architecture proposal for intake ID: ${intake.id}`
      );

      const agentResult = await this.runArchitectureAgent(platform, prompt);
      const parsedOutput = this.parseAgentOutput(agentResult.finalOutput ?? '');
      const formattedProposal = this.formatProposal(parsedOutput);

      if (!intake.id) {
        throw new Error('Intake ID is required');
      }
      const id = await this.saveProposal(formattedProposal, intake.id);

      this.logger.log(
        `Successfully created architecture proposal for intake ID: ${intake.id}`
      );
      return { ...formattedProposal, id };
    } catch (error) {
      this.logger.error(
        `Failed to create architecture proposal for intake ID: ${intake.id}`,
        error
      );
      throw error;
    }
  }

  /**
   * Retrieves an architecture proposal by ID
   * @param id - The proposal ID
   * @returns Promise<ArchitectureProposal | null> - The architecture proposal or null if not found
   * @throws Error if retrieval fails
   */
  async getArchitectureProposal(
    id: string
  ): Promise<ArchitectureProposal | null> {
    this.validateId(id);

    const firestore = this.firebaseService.getFirestore();

    try {
      this.logger.log(`Retrieving architecture proposal with ID: ${id}`);

      const docRef = firestore.collection(this.ARCHITECTURE_COLLECTION).doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        this.logger.warn(`Architecture proposal with ID ${id} not found`);
        return null;
      }

      const proposal = docSnap.data() as ArchitectureProposal;
      this.logger.log(
        `Successfully retrieved architecture proposal with ID: ${id}`
      );
      return proposal;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve architecture proposal with ID ${id}`,
        error
      );
      throw new Error(
        `Could not fetch proposal: ${this.getErrorMessage(error)}`
      );
    }
  }

  /**
   * Validates input for creating architecture proposal
   * @private
   */
  private validateCreateProposalInput(dto: ArchitecturePropsalDto): void {
    if (!dto) {
      throw new Error('Architecture proposal DTO is required');
    }

    if (!dto.platform) {
      throw new Error('Platform is required');
    }

    if (!dto.intake) {
      throw new Error('Intake data is required');
    }

    if (!dto.intake.id) {
      throw new Error('Intake ID is required');
    }
  }

  /**
   * Validates ID parameter
   * @private
   */
  private validateId(id: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new Error('Valid ID is required');
    }
  }

  /**
   * Runs the solution architect agent
   * @private
   */
  private async runArchitectureAgent(platform: string, prompt: string) {
    try {
      const result = await run(
        solutionArchitectAgent(platform as ArchiecturePlatform),
        prompt
      );

      if (!result.finalOutput) {
        throw new Error('No final output from architecture agent');
      }

      return result;
    } catch (error) {
      this.logger.error('Architecture agent execution failed', error);
      throw new Error(`Agent execution failed: ${this.getErrorMessage(error)}`);
    }
  }

  /**
   * Safely parses agent output
   * @private
   */
  private parseAgentOutput(finalOutput: string): ArchitectureProposal {
    try {
      // Using JSON.parse instead of eval for security
      // If the output is not valid JSON, this will throw an error
      const parsedOutput = JSON.parse(finalOutput);

      // Validate that the parsed output has the expected structure
      if (!this.isValidArchitectureProposal(parsedOutput)) {
        throw new Error('Invalid architecture proposal structure');
      }

      return parsedOutput as ArchitectureProposal;
    } catch (parseError) {
      this.logger.error('Failed to parse agent output', parseError);

      // Fallback: Try to use eval only if JSON.parse fails
      // This is still risky but maintains backward compatibility
      try {
        const evalResult = eval('(' + finalOutput + ')');
        if (!this.isValidArchitectureProposal(evalResult)) {
          throw new Error('Invalid architecture proposal structure from eval');
        }
        return evalResult as ArchitectureProposal;
      } catch (evalError) {
        this.logger.error(
          'Failed to parse agent output with eval fallback',
          evalError
        );
        throw new Error('Invalid format in agent output');
      }
    }
  }

  /**
   * Validates if the parsed output is a valid architecture proposal
   * @private
   */
  private isValidArchitectureProposal(obj: any): boolean {
    return (
      obj &&
      typeof obj === 'object' &&
      obj.diagram &&
      typeof obj.diagram === 'object'
    );
  }

  /**
   * Formats the proposal for storage
   * @private
   */
  private formatProposal(proposal: ArchitectureProposal): ArchitectureProposal {
    if (proposal.diagram?.mermaid) {
      proposal.diagram.mermaid = this.mermaidFormatter.format(
        proposal.diagram.mermaid as string
      );
    }
    return proposal;
  }

  /**
   * Saves the architecture proposal to the database
   * @private
   */
  private async saveProposal(
    proposal: ArchitectureProposal,
    intakeId: string
  ): Promise<string> {
    const firestore = this.firebaseService.getFirestore();

    try {
      proposal.intakeId = intakeId;

      const archProposalRef = await firestore
        .collection(this.ARCHITECTURE_COLLECTION)
        .add(proposal);

      this.logger.log(
        `Saved architecture proposal with ID: ${archProposalRef.id}`
      );

      await this.updateIntakeWithProposalId(intakeId, archProposalRef.id);
      return archProposalRef.id;
    } catch (error) {
      this.logger.error(
        `Failed to save architecture proposal for intake ID ${intakeId}`,
        error
      );
      throw new Error(
        `Could not save proposal: ${this.getErrorMessage(error)}`
      );
    }
  }

  /**
   * Updates the intake document with the architecture proposal ID
   * @private
   */
  private async updateIntakeWithProposalId(
    intakeId: string,
    proposalId: string
  ): Promise<void> {
    const firestore = this.firebaseService.getFirestore();

    try {
      await firestore
        .collection(this.INTAKES_COLLECTION)
        .doc(intakeId)
        .update({ archProposalId: proposalId });

      this.logger.log(
        `Updated intake ${intakeId} with proposal ID: ${proposalId}`
      );
    } catch (error) {
      this.logger.error(
        `Failed to update intake ${intakeId} with proposal ID`,
        error
      );
      throw new Error(
        `Could not update intake: ${this.getErrorMessage(error)}`
      );
    }
  }

  /**
   * Extracts error message from various error types
   * @private
   */
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Unknown error occurred';
  }
}
