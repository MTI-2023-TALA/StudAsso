// Request DTOs

import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAssociationOfferDto {
  @IsNotEmpty()
  @IsInt()
  roleId: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;
}

// Response DTOs
