import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleScenarioDto } from './scenario.dto';
import { IScenarioService } from './scenario.service';

@Controller('scenarios')
export class ScenarioController {
  constructor(private scenarioService: IScenarioService) {}

  @ApiTags('Scenarios')
  @ApiResponse({
    status: 200,
    description: 'Returns a list of registered scenarios',
    type: [SimpleScenarioDto],
  })
  @Get()
  async findAll(): Promise<SimpleScenarioDto[]> {
    const scenarios = await this.scenarioService.findAll();
    return scenarios.map(SimpleScenarioDto.fromDomain);
  }

  @ApiTags('Scenarios')
  @ApiResponse({
    status: 200,
    description: 'Returns a specific scenario with extra details',
    type: SimpleScenarioDto,
  })
  @Get(':id')
  async findOne(@Param('id') id): Promise<SimpleScenarioDto> {
    const scenario = await this.scenarioService.findOneWithRelations(id);
    if (!scenario) {
      throw new HttpException('Invalid Scenario', HttpStatus.BAD_REQUEST);
    }
    return SimpleScenarioDto.fromDomain(scenario); //TODO: add another DTO with extra details(actions, ...)
  }
}
