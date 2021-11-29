import { ApiProperty } from '@nestjs/swagger';
import { ScenarioStatus } from '../../entities/scenario-status.entity';
import { Scenario } from '../../entities/scenario.entity';
import { ActionDto } from '../action/action.dto';

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

export class ScenarioDto extends SimpleScenarioDto {
  @ApiProperty({ type: [ActionDto] })
  actions: ActionDto[];

  static fromDomain(scenario: Scenario): ScenarioDto {
    const dto = new ScenarioDto();
    Object.assign(dto, SimpleScenarioDto.fromDomain(scenario));
    dto.actions = scenario.actions.map(ActionDto.fromDomain);
    return dto;
  }
}

export class RegisterScenarioDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  context: string;

  @ApiProperty()
  isTemplate: boolean;

  toDomain(): Scenario {
    const scenario = new Scenario();
    scenario.title = this.title;
    scenario.context = this.context;
    scenario.isTemplate = this.isTemplate;
    return scenario;
  }
}
