import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum FUNDING_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// Request DTOs

export class CreateFundingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
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

export class OptionStatFundingDto {
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  nbAccepted?: boolean;

  @IsOptional()
  @IsBoolean()
  nbRejected?: boolean;
}

// Response DTOs

export class FundingDto {
  id: number;
  createdAt: Date;
  name: string;
  amount: number;
  motivation: string;
  status: FUNDING_STATUS;
  schoolComment?: string;
}

export class StatFundingDto {
  sum?: number;
  nbAccepted?: number;
  nbRefused?: number;
}
