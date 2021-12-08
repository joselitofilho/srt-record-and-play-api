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
import { ActionDto } from './dto/action.dto';
import { RegisterActionDto } from './dto/register-action.dto';

@ApiTags('Actions')
@Controller('actions')
export class ActionController {
  constructor(private actionService: IActionService) {}

  @ApiBody({ type: RegisterActionDto })
  @ApiResponse({
    status: 201,
    description: 'Register a new action',
    type: ActionDto,
  })
  @Post()
  @HttpCode(201)
  async register(@Body() input: RegisterActionDto): Promise<ActionDto> {
    const action = await this.actionService.save(
      RegisterActionDto.toDomain(input),
    );
    return ActionDto.fromDomain(action);
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
