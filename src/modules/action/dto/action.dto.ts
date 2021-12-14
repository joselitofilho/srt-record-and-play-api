import { ApiProperty } from '@nestjs/swagger';
import {
  Action,
  ActionDataElement,
  ActionDataUrl,
} from '../../../entities/action.entity';
import { ActionDataElementDto } from './action-data-element.dto';
import { ActionDataUrlDto } from './action-data-url.dto';

export class ActionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  category: string;

  @ApiProperty({
    type: ActionDataElementDto,
  })
  data: ActionDataUrlDto | ActionDataElementDto;

  static fromDomain(action: Action): ActionDto {
    const dto = new ActionDto();
    dto.id = action.id;
    dto.type = action.type;
    dto.category = action.category;
    dto.data =
      action.category === 'open_url'
        ? ActionDataUrlDto.fromDomain(action.data as ActionDataUrl)
        : ActionDataElementDto.fromDomain(action.data as ActionDataElement);
    return dto;
  }
}

export class ActionsDto {
  @ApiProperty({ type: [ActionDto] })
  actions: ActionDto[];

  static fromDomain(actions: Action[]) {
    const dto = new ActionsDto();
    dto.actions = actions.map(ActionDto.fromDomain);
    return dto;
  }
}
