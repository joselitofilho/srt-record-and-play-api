import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  Action,
  ActionDataElement,
  ActionDataUrl,
} from '../../entities/action.entity';

@ApiExtraModels()
export class ActionDataUrlDto {
  @ApiProperty()
  url: string;

  static fromDomain(data: ActionDataUrl): ActionDataUrlDto {
    const dto = new ActionDataUrlDto();
    dto.url = data.url;
    return dto;
  }
}

@ApiExtraModels()
export class ActionDataElementDto {
  @ApiProperty()
  by: string;

  @ApiProperty()
  element: string;

  @ApiProperty()
  element_type: string;

  @ApiProperty()
  element_name: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  key: string;

  static fromDomain(data: ActionDataElement): ActionDataElementDto {
    const dto = new ActionDataElementDto();
    dto.by = data.by;
    dto.element = data.element;
    dto.element_type = data.element_type;
    dto.element_name = data.element_name;
    dto.text = data.text;
    dto.key = data.key;
    return dto;
  }
}

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
