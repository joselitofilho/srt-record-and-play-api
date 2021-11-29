import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  RegisterScenarioDto,
  ScenarioDto,
  SimpleScenarioDto,
} from './scenario.dto';
import { IScenarioService } from './scenario.service';

@ApiTags('Scenarios')
@Controller('scenarios')
export class ScenarioController {
  constructor(private scenarioService: IScenarioService) {}

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

  @ApiResponse({
    status: 200,
    description: 'Returns a specific scenario with extra details',
    type: ScenarioDto,
  })
  @Get(':id')
  async findOne(@Param('id') id): Promise<ScenarioDto> {
    const scenario = await this.scenarioService.findOneWithRelations(id);
    if (!scenario) {
      throw new HttpException('Invalid Scenario', HttpStatus.BAD_REQUEST);
    }
    return ScenarioDto.fromDomain(scenario);
  }

  @ApiResponse({
    status: 200,
    description: 'Register a new scenario',
    type: SimpleScenarioDto,
  })
  @Post()
  async register(@Body() input: RegisterScenarioDto): Promise<ScenarioDto> {
    const scenario = await this.scenarioService.save(input.toDomain());
    return ScenarioDto.fromDomain(scenario);
  }
}
