import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import {
  Action,
  ActionDataElement,
  ActionDataUrl,
} from '../../../entities/action.entity';
import { Scenario } from '../../../entities/scenario.entity';
import { ActionDataElementDto } from './action-data-element.dto';
import { RegisterActionDataDto } from './register-action-data.dto';

export class RegisterActionDataUrlDto {
  @IsUrl()
  @ApiProperty()
  url: string;

  static toDomain(dto: RegisterActionDataDto): ActionDataUrl {
    const dataElement = new ActionDataUrl();
    dataElement.url = dto.url;
    return dataElement;
  }
}
export class RegisterActionDataElementDto {
  @IsIn(['id', 'css', 'xpath'])
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

  static toDomain(dto: RegisterActionDataDto): ActionDataElement {
    const dataElement = new ActionDataElement();
    dataElement.by = dto.by;
    dataElement.element = dto.element;
    dataElement.element_type = dto.element_type;
    dataElement.element_name = dto.element_name;
    return dataElement;
  }
}
export class RegisterActionDataTypeDto extends RegisterActionDataElementDto {
  @IsString()
  @ApiProperty()
  text: string;

  static toDomain(dto: RegisterActionDataDto): ActionDataElement {
    const dataElement = RegisterActionDataElementDto.toDomain(dto);
    dataElement.text = dto.text;
    return dataElement;
  }
}
export class RegisterActionDataTypeKeyDto extends RegisterActionDataElementDto {
  @IsString()
  @ApiProperty()
  key: string;

  static toDomain(dto: ActionDataElementDto): ActionDataElement {
    const dataElement = RegisterActionDataElementDto.toDomain(dto);
    dataElement.key = dto.key;
    return dataElement;
  }
}

const actionDataMap = {
  open_url: RegisterActionDataUrlDto,
  click: RegisterActionDataElementDto,
  type: RegisterActionDataTypeDto,
  type_key: RegisterActionDataTypeKeyDto,
};

export class RegisterActionDto {
  @IsIn(['action', 'assertion'])
  @ApiProperty()
  type: string;

  @IsIn(['open_url', 'click', 'type', 'type_key'])
  @ApiProperty()
  category: string;

  @IsNumber()
  @ApiProperty()
  scenarioId: number;

  @ValidateNested({ always: true })
  @Type(({ object }) => actionDataMap[object.category])
  @ApiProperty({ type: RegisterActionDataDto })
  data: RegisterActionDataDto;

  static toDomain(dto: RegisterActionDto): Action {
    const action = new Action();
    action.type = dto.type;
    action.category = dto.category;
    action.scenario = new Scenario();
    action.scenario.id = dto.scenarioId;
    action.data = actionDataMap[dto.category].toDomain(dto.data);
    return action;
  }
}

export class RegisterActionsDto {
  @ArrayMinSize(1)
  @ArrayMaxSize(64)
  @Type(() => RegisterActionDto)
  @ValidateNested({ each: true, always: true })
  @ApiProperty({ required: true, type: [RegisterActionDto] })
  actions: RegisterActionDto[];

  static toDomain(dto: RegisterActionsDto): Action[] {
    return dto.actions.map(RegisterActionDto.toDomain);
  }
}
