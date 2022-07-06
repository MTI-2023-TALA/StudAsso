import { IsInt, IsNotEmpty, IsString } from 'class-validator';

// Request DTOs

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  associationId: number;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

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

// Response DTOs
export class RoleDto {
  id: number;
  name: string;
  associationId: number;
}
