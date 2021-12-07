import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { ActionDataElement } from '../../../entities/action.entity';

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
