import { IsOptional, IsString } from 'class-validator';

import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateRoleDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  name: string;
}
