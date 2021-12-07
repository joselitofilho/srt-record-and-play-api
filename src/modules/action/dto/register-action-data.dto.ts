import { ApiProperty } from '@nestjs/swagger';
import {
  ActionDataElement,
  ActionDataUrl,
} from '../../../entities/action.entity';
import { RegisterActionDto } from './register-action.dto';

export class RegisterActionDataDto {
  @ApiProperty()
  by?: string;

  @ApiProperty()
  element?: string;

  @ApiProperty()
  element_type?: string;

  @ApiProperty()
  element_name?: string;

  @ApiProperty()
  text?: string;

  @ApiProperty()
  key?: string;

  @ApiProperty()
  url?: string;

  static toDomain(
    registerDto: RegisterActionDto,
  ): ActionDataElement | ActionDataUrl {
    const dto = registerDto.data;
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
