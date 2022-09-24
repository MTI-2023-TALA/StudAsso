// Request DTOs

import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAssociationOfferDto {
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsNotEmpty()
  @IsDateString()
  deadline: Date;
}

// Response DTOs

export class AssociationOfferDto {
  id: number;
  associationId: number;
  roleId: number;
  deadline: Date;
}

export class AssociationOfferWithAssoAndRoleDto {
  id: number;
  deadline: Date;
  associationId: number;
  associationName: string;
  roleId: number;
  roleName: string;
}

export class AssociationOfferStatsDto {
  id: number;
  deadline: Date;
  roleId: number;
  roleName: string;
  numberOfApplications: number;
}
