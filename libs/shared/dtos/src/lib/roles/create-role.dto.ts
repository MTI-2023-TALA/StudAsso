import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseDto } from '../base/create-base.dto';

export class CreateRoleDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  associationId: number;
}
