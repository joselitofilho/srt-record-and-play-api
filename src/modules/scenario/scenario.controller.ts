import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiParam({ type: String, name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'Returns a specific scenario with extra details',
    type: ScenarioDto,
  })
  @Get(':id')
  async findOne(@Param('id') id): Promise<ScenarioDto> {
    const scenario = await this.scenarioService.findOneWithRelations(id);
    if (!scenario) {
      throw new HttpException('Invalid scenario', HttpStatus.BAD_REQUEST);
    }
    return ScenarioDto.fromDomain(scenario);
  }

  @ApiResponse({
    status: 201,
    description: 'Register a new scenario',
    type: SimpleScenarioDto,
  })
  @HttpCode(201)
  @Post()
  async register(@Body() input: RegisterScenarioDto): Promise<ScenarioDto> {
    const scenario = await this.scenarioService.save(
      RegisterScenarioDto.toDomain(input),
    );
    return ScenarioDto.fromDomain(scenario);
  }
}
