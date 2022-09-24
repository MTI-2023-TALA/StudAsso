// Request DTOs

import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAssociationOfferDto {
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsNotEmpty()
  @IsDateString()
  deadLine: Date;
}

// Response DTOs

export class AssociationOfferDto {
  id: number;
  associationId: number;
  roleId: number;
  deadLine: Date;
}

export class AssociationOfferWithAssoAndRoleDto {
  id: number;
  deadLine: Date;
  associationId: number;
  associationName: string;
  roleId: number;
  roleName: string;
}
