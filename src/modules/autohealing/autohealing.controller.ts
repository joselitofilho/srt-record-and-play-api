import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import autohealingAPI from 'src/api/autohealing';
import { RunStatus, ScenarioDto } from '../scenario/scenario.dto';
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
  async execute(@Param('id', ParseIntPipe) id: number): Promise<ScenarioDto> {
    let scenario = await this.scenarioService.findOneWithRelations(id);
    if (!scenario) {
      throw new HttpException('Invalid scenario', HttpStatus.BAD_REQUEST);
    }

    const fileContent = '';

    await autohealingAPI
      .post('autohealing/text', { content: fileContent })
      .then(async () => {
        scenario.status.autoHealingStatus = RunStatus.PASSING;
        scenario.status.autoHealingResponse = `{}`;
        scenario = await this.scenarioService.save(scenario);
      })
      .catch((error) => {
        console.log(error);
        const errorFunctions = {
          [HttpStatus.BAD_REQUEST]: async () => {
            const errorMsg = JSON.stringify(error.response);

            scenario.status.autoHealingStatus = RunStatus.FAILING;
            scenario.status.autoHealingResponse = errorMsg;
            scenario = await this.scenarioService.save(scenario);

            throw new HttpException(errorMsg, HttpStatus.BAD_REQUEST);
          },
          [HttpStatus.NOT_FOUND]: () => {
            throw new HttpException(
              'Resource not found in the Autohealing API',
              HttpStatus.NOT_FOUND,
            );
          },
          [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: () => {
            throw new HttpException(
              'Payload format is not a supported format by Autohealing API',
              HttpStatus.UNSUPPORTED_MEDIA_TYPE,
            );
          },
        };
        if (errorFunctions[error.response.status] === undefined) {
          throw new HttpException(
            'Autohealing API unavailable',
            HttpStatus.NOT_FOUND,
          );
        }
        errorFunctions[error.response.status]();
      });

    return ScenarioDto.fromDomain(scenario);
  }
}
