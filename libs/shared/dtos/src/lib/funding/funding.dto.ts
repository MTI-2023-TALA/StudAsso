import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum FUNDING_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// Request DTOs

export class CreateFundingDto {
  @IsNotEmpty()
  @IsString()
  amount: number;

  @IsNotEmpty()
  @IsString()
  motivation: string;
}

export class UpdateFundingDto {
  @IsNotEmpty()
  @IsString()
  status: FUNDING_STATUS;

  @IsOptional()
  @IsString()
  schoolComment?: string;
}

// Response DTOs

export class FundingDto {
  id: number;
  createdAt: Date;
  amount: number;
  motivation: string;
  status: FUNDING_STATUS;
  schoolComment?: string;
}
