import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArchitectureAgentService } from './architecture-agent.service';
import { ArchitecturePropsalDto } from '@ease/dto';
import { FirebaseAuthGuard } from '../firebase-admin/firebase-auth.guard';
import { ArchitectureProposal } from '@ease/interfaces';

@UseGuards(FirebaseAuthGuard)
@Controller('architecture')
export class ArchitectureAgentController {
  constructor(private architectureAgent: ArchitectureAgentService) {}

  @Post('/proposal')
  createArchitectureProposal(@Body('dto') dto: ArchitecturePropsalDto) {
    return this.architectureAgent.createArchitectureProposal(dto);
  }

  @Get('/proposal/:id')
  getArchiectureProposal(
    @Param('id') id: string
  ): Promise<ArchitectureProposal | null> {
    return this.architectureAgent.getArchitectureProposal(id);
  }

  @Delete('/proposal/:id')
  deleteArchitectureProposal(
    @Param('id') id: string,
    @Query('intakeId') intakeId: string
  ): Promise<{
    success: boolean;
    message: string;
    intakeId: string;
    id: string;
  }> {
    return this.architectureAgent.deleteArchitectureProposal(id, intakeId);
  }
}
