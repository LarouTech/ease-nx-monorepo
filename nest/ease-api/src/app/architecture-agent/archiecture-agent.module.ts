import { Module } from '@nestjs/common';
import { ArchitectureAgentController } from './archiecture-agent.controller';
import { ArchitectureAgentService } from './architecture-agent.service';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { MermaidFormatter } from './mermaid-formatter.service';

@Module({
  controllers: [ArchitectureAgentController],
  providers: [ArchitectureAgentService, MermaidFormatter],
  imports: [FirebaseAdminModule],
})
export class ArchiectureAgentModule {}
