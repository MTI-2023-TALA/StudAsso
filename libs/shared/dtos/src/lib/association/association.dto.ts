import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { QueryPaginationDto, SORT_ORDER } from '../query/query.dto';

import { AssoMembersSortValidator } from './association-validator';
import { SortOrderValidator } from '../query/sort-validator';

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
  @Validate(AssoMembersSortValidator)
  sort?: SORT_ASSO_MEMBERS = SORT_ASSO_MEMBERS.BY_ROLE_NAME;

  @IsOptional()
  @IsString()
  @Validate(SortOrderValidator)
  order?: SORT_ORDER = SORT_ORDER.ASC;
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
