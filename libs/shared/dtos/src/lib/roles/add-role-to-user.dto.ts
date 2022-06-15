import { IsInt, IsNotEmpty } from 'class-validator';

export class AddRoleToUserDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  associationId: number;

  @IsNotEmpty()
  @IsInt()
  roleId: number;
}
