import { IsInt, IsOptional } from 'class-validator';
import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateAssociationsMemberDto extends UpdateBaseDto {
  @IsOptional()
  @IsInt()
  roleId: number;
}
