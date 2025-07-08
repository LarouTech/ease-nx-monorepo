import { ArchiecturePlatform } from '@ease/types';
import { IntakeDto } from './intake.dto';

export interface ArchitecturePropsalDto {
  intake: IntakeDto;
  platform: ArchiecturePlatform;
}
