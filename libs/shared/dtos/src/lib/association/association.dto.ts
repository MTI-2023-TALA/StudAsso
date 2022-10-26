import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { QueryPaginationDto, SORT_ORDER } from '../query/query.dto';

import { IsValueInEnumValidator } from '../validators/enum-validator';

// Request DTOs

export class CreateAssociationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  presidentId: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateAssociationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

// Query Request DTOs

export enum SORT_ASSO_MEMBERS {
  BY_ROLE_NAME = 'role_name',
  BY_EMAIL = 'user_email',
}

export class QueryAssociationMembersDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @Validate(IsValueInEnumValidator, [SORT_ASSO_MEMBERS])
  sort?: SORT_ASSO_MEMBERS = SORT_ASSO_MEMBERS.BY_ROLE_NAME;

  @IsOptional()
  @IsString()
  @Validate(IsValueInEnumValidator, [SORT_ORDER])
  order?: SORT_ORDER = SORT_ORDER.ASC;

  @IsOptional()
  @IsString()
  filter?: string;
}

// Response DTOs

export class AssociationDto {
  id: number;
  name: string;
  description?: string;
}

export class AssociationWithPresidentDto {
  id: number;
  name: string;
  description?: string;
  presidentId: number;
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}

export class AssociationMemberWithRoleDto {
  userFullName: string;
  userEmail: string;
  roleName: string;
}

export class AssociationAndRoleNameDto {
  associationId: number;
  associationName: string;
  roleName: string;
}
