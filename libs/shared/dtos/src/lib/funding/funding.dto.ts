import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';

import { IsValueInEnumValidator } from '../validators/enum-validator';

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
  @Validate(IsValueInEnumValidator, [FUNDING_STATUS])
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

// Request Query DTOs

export class QueryFundingStatusDto {
  @IsOptional()
  @IsString()
  @Validate(IsValueInEnumValidator, [FUNDING_STATUS])
  status?: FUNDING_STATUS = FUNDING_STATUS.PENDING;
}

// Response DTOs

export class FundingDto {
  id: number;
  createdAt: Date;
  name: string;
  amount: number;
  motivation: string;
  status: string;
  schoolComment?: string;
  association: string;
}

export class StatFundingDto {
  sum?: number;
  nbAccepted?: number;
  nbRefused?: number;
}

export class SumFundingStatusDto {
  sum: number;
}
