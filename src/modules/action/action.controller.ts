import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IActionService } from './action.service';

@ApiTags('Actions')
@Controller('actions')
export class ActionController {
  constructor(private actionService: IActionService) {}

  @Post()
  register() {
    //TODO: Implement register method
    return null;
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    //TODO: Implement delete method
    return null;
  }
}
