import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PermissionId } from '@stud-asso/shared/permission';

// Request DTOs

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(PermissionId, { each: true })
  permissions: PermissionId[];
}

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(PermissionId, { each: true })
  permissions?: PermissionId[];
}

export class AddRoleToUserDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  roleId: number;
}

export class AssoIdOfUserDto {
  @IsNotEmpty()
  @IsInt()
  assoId: number;
}

// Response DTOs
export class RoleDto {
  id: number;
  name: string;
  associationId: number;
  permissions: PermissionId[];
}

export class RoleOnlyPermissionsDto {
  permissions: PermissionId[];
}
