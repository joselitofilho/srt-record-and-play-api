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
import { toAutoHealingJavaFile } from 'src/helpers/timelineTranslation';
import { APIError } from 'src/types';
import { AutoHealingAPI } from '../../services/autohealing';
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
      throw new HttpException('Invalid scenario', HttpStatus.NOT_FOUND);
    }

    const fileContent = toAutoHealingJavaFile(
      scenario.actions,
      scenario.context,
      scenario.title,
    );

    const error = await AutoHealingAPI.Autohealing.text({
      content: fileContent.join('\n'),
    })
      .then(async ({ data }): Promise<APIError> => {
        const { status, healings } = data;
        scenario.status.autoHealingStatus = status;
        scenario.status.autoHealingResponse = JSON.stringify(healings);
        scenario = await this.scenarioService.save(scenario);
        return { message: 'OK', statusCode: HttpStatus.OK };
      })
      .catch((error) => {
        return error.response.data;
      });

    const { message, statusCode } = error;

    const errorFunctions = {
      [HttpStatus.BAD_REQUEST]: async (): Promise<APIError> => {
        scenario.status.autoHealingStatus = RunStatus.FAILING;
        scenario.status.autoHealingResponse = message;
        scenario = await this.scenarioService.save(scenario);

        return { message, statusCode };
      },
      [HttpStatus.NOT_FOUND]: (): APIError => {
        return {
          message: 'Resource not found in the Autohealing API',
          statusCode,
        };
      },
      [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: (): APIError => {
        return {
          message:
            'Payload format is not a supported format by Autohealing API',
          statusCode,
        };
      },
    };

    if (statusCode === HttpStatus.OK) {
      return ScenarioDto.fromDomain(scenario);
    } else if (errorFunctions[statusCode] === undefined) {
      throw new HttpException(
        'Autohealing API unavailable',
        HttpStatus.NOT_FOUND,
      );
    }

    const errorResponse: APIError = await errorFunctions[statusCode]();
    throw new HttpException(errorResponse.message, errorResponse.statusCode);
  }
}
