import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IActionService } from './action.service';
import { ActionDto, ActionsDto } from './dto/action.dto';
import { RegisterActionsDto } from './dto/register-action.dto';

@ApiTags('Actions')
@Controller('actions')
export class ActionController {
  constructor(private actionService: IActionService) {}

  @ApiBody({ type: RegisterActionsDto })
  @ApiResponse({
    status: 201,
    description: 'Registers mutiple actions',
    type: ActionsDto,
  })
  @Post()
  @HttpCode(201)
  async register(@Body() input: RegisterActionsDto): Promise<ActionsDto> {
    const actions = await this.actionService.saveMany(
      RegisterActionsDto.toDomain(input),
    );
    return ActionsDto.fromDomain(actions);
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Deletes an action',
    type: ActionDto,
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const action = await this.actionService.delete(id);
    if (!action) throw new HttpException('Invalid Action', HttpStatus.OK);
    return ActionDto.fromDomain(action);
  }
}
