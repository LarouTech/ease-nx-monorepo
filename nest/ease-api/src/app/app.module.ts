import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ArchiectureAgentModule } from './architecture-agent/archiecture-agent.module';

@Module({
  imports: [ConfigModule.forRoot(), ArchiectureAgentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
