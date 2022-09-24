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

export class AssociationOfferApplicationReviewDto {
  id: number;
  applicationDate: Date;
  motivation: string;
  associationOfferId: number;
  roleId: number;
  roleName: string;
  userId: number;
  userFirstname: string;
  userLastname: string;
  userEmail: string;
}
