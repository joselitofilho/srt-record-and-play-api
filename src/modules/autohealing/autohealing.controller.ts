import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScenarioDto } from '../scenario/scenario.dto';
import { IScenarioService } from '../scenario/scenario.service';

@ApiTags('Autohealing')
@Controller('autohealing')
export class AutohealingController {
  constructor(private scenarioService: IScenarioService) {}

  @ApiResponse({
    status: 200,
    description: 'Executes autohealing for the specific scenario',
    type: ScenarioDto,
  })
  @HttpCode(200)
  @Post('scenario/:id')
  async register(@Param('id', ParseIntPipe) id: number): Promise<ScenarioDto> {
    const scenario = await this.scenarioService.findOneWithRelations(id);
    if (!scenario) {
      throw new HttpException('Invalid scenario', HttpStatus.BAD_REQUEST);
    }
    return ScenarioDto.fromDomain(scenario);
  }
}
