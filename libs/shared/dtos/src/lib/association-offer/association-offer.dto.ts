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
