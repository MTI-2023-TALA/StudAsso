import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateBaseDto } from '../base/create-base.dto';

export class CreateAssociationsMemberDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsInt()
  associationId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  roleId: number;
}
