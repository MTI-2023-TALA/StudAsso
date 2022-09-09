import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  description: string;
}

export class UpdateAssociationDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
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
  description: string;
  presidentId: number;
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}

export class AssociationMemberWithRoleDto {
  firstname: string;
  lastname: string;
  roleName: string;
}

export class AssociationAndRoleNameDto {
  associationName: string;
  roleName: string;
}
