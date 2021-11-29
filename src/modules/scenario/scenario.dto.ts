import { ApiProperty } from '@nestjs/swagger';
import { ScenarioStatus } from '../../entities/scenario-status.entity';
import { Scenario } from '../../entities/scenario.entity';

export class ScenarioStatusDto {
  @ApiProperty()
  runStatus: string;

  @ApiProperty()
  autoHealingStatus: string;

  @ApiProperty()
  selfHealingStatus: string;

  static fromDomain(status: ScenarioStatus): ScenarioStatusDto {
    const dto = new ScenarioStatusDto();
    dto.runStatus = status.status;
    return dto;
  }
}

export class SimpleScenarioDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  context: string;

  @ApiProperty()
  isTemplate: boolean;

  @ApiProperty()
  status: ScenarioStatusDto;

  static fromDomain(scenario: Scenario): SimpleScenarioDto {
    const dto = new SimpleScenarioDto();
    dto.id = scenario.id;
    dto.title = scenario.title;
    dto.context = scenario.context;
    dto.isTemplate = scenario.isTemplate;
    dto.status = ScenarioStatusDto.fromDomain(scenario.status);
    return dto;
  }
}

export class FindOneScenarioResponseDto {}
