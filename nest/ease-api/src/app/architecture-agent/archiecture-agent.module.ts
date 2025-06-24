import { Module } from '@nestjs/common';
import { ArchitectureAgentController } from './archiecture-agent.controller';
import { ArchitectureAgentService } from './architecture-agent.service';

@Module({
  controllers: [ArchitectureAgentController],
  providers: [ArchitectureAgentService],
})
export class ArchiectureAgentModule {}
