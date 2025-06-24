import { Body, Controller, Post } from '@nestjs/common';
import {
  ArchitectureAgentService,
  ArchitecturePropsalDto,
} from './architecture-agent.service';

@Controller('architecture')
export class ArchitectureAgentController {
  constructor(private architectureAgent: ArchitectureAgentService) {}

  @Post('/proposal')
  createArchitectureProposal(@Body() dto: ArchitecturePropsalDto) {
    return this.architectureAgent.createArchitectureProposal(dto);
  }
}
