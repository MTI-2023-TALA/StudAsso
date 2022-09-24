// Request DTOs

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAssociationOfferApplicationDto {
  @IsNotEmpty()
  @IsInt()
  associationOfferId: number;

  @IsNotEmpty()
  @IsString()
  motivation: string;
}

// Response DTOs

export class AssociationOfferApplicationDto {
  id: number;
  associationOfferId: number;
  userId: number;
  motivation: string;
}
