import { ApiProperty } from '@nestjs/swagger';
import { ActionDataUrl } from '../../../entities/action.entity';

export class ActionDataUrlDto {
  @ApiProperty()
  url: string;

  static fromDomain(data: ActionDataUrl): ActionDataUrlDto {
    const dto = new ActionDataUrlDto();
    dto.url = data.url;
    return dto;
  }
}
