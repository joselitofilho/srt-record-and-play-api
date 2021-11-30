import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsString, ValidateNested } from 'class-validator';
import {
  Action,
  ActionDataElement,
  ActionDataUrl,
} from '../../entities/action.entity';
import { Scenario } from '../../entities/scenario.entity';

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
    dto.text = data.text ? data.text : undefined;
    dto.key = data.key ? data.key : undefined;
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

export class RegisterActionDto {
  @IsString()
  @ApiProperty()
  type: string;

  @IsIn(['open_url', 'click', 'type', 'type_key'])
  @ApiProperty()
  category: string;

  @IsNumber()
  @ApiProperty()
  projectId: number;

  @ValidateNested()
  @ApiProperty({ type: ActionDataElementDto })
  data: ActionDataUrlDto | ActionDataElementDto;

  static toDomain(dto: RegisterActionDto): Action {
    let actionData: ActionDataElement | ActionDataUrl;
    const action = new Action();
    action.type = dto.type;
    action.category = dto.category;
    action.scenario = new Scenario();
    action.scenario.id = dto.projectId;

    if (action.category === 'open_url') {
      const { url } = dto.data as ActionDataUrlDto;
      actionData = new ActionDataUrl();
      actionData.url = url;
    } else {
      actionData = RegisterActionDataElementDto.toDomain(
        dto.data as ActionDataElementDto,
      );
    }
    action.data = actionData;
    return action;
  }
}

export class RegisterActionDataElementDto {
  @IsString()
  @ApiProperty()
  by: string;

  @IsString()
  @ApiProperty()
  element: string;

  @IsString()
  @ApiProperty()
  element_type: string;

  @IsString()
  @ApiProperty()
  element_name: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  key: string;

  static toDomain(dto: ActionDataElementDto): ActionDataElement {
    const dataElement = new ActionDataElement();
    dataElement.by = dto.by;
    dataElement.element = dto.element;
    dataElement.element_type = dto.element_type;
    dataElement.element_name = dto.element_name;
    dataElement.text = dto.text;
    dataElement.key = dto.key;
    return dataElement;
  }
}
