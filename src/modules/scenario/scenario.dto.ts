import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ScenarioStatus } from '../../entities/scenario-status.entity';
import { Scenario } from '../../entities/scenario.entity';
import { ActionDto } from '../action/dto/action.dto';

export const RunStatus = {
  IDLE: 'IDLE',
  PASSING: 'PASSING',
  FAILING: 'FAILING',
  RUNNING: 'RUNNING',
};

export class ScenarioStatusDto {
  @ApiProperty()
  runStatus: string;

  @ApiProperty()
  autoHealingStatus: string;

  @ApiProperty()
  autoHealingResponse: string;

  static fromDomain(status: ScenarioStatus): ScenarioStatusDto {
    const dto = new ScenarioStatusDto();
    dto.runStatus = status.runStatus;
    dto.autoHealingStatus = status.autoHealingStatus || undefined;
    dto.autoHealingResponse = status.autoHealingResponse || undefined;
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

  @ApiProperty({ type: ScenarioStatusDto })
  status: ScenarioStatusDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromDomain(scenario: Scenario): SimpleScenarioDto {
    const dto = new SimpleScenarioDto();
    dto.id = scenario.id;
    dto.title = scenario.title;
    dto.context = scenario.context;
    dto.isTemplate = scenario.isTemplate;
    dto.createdAt = scenario.createdAt;
    dto.updatedAt = scenario.updatedAt;
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
    dto.actions = scenario.actions
      ? scenario.actions.map(ActionDto.fromDomain)
      : [];
    return dto;
  }
}

export class RegisterScenarioDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  context: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isTemplate: boolean;

  static toDomain(dto: RegisterScenarioDto): Scenario {
    const scenario = new Scenario();
    scenario.title = dto.title;
    scenario.context = dto.context;
    scenario.isTemplate = dto.isTemplate;
    scenario.status = new ScenarioStatus();
    scenario.status.runStatus = RunStatus.PASSING;
    scenario.status.autoHealingStatus = RunStatus.IDLE;
    scenario.status.autoHealingResponse = '';
    return scenario;
  }
}
