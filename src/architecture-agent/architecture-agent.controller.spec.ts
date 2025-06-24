import { Test, TestingModule } from '@nestjs/testing';
import { ArchitectureAgentController } from './architecture-agent.controller';

describe('ArchitectureAgentController', () => {
  let controller: ArchitectureAgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchitectureAgentController],
    }).compile();

    controller = module.get<ArchitectureAgentController>(ArchitectureAgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
