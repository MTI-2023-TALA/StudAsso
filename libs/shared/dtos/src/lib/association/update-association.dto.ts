import { IsOptional, IsString } from 'class-validator';

import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateAssociationDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  name: string;
}
