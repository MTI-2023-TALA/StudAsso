import { FUNDING_STATUS, IsValueInEnumValidator } from '@stud-asso/shared/dtos';

import { Validate } from 'class-validator';

// Request Models

export class CreateFundingModel {
  name: string;
  amount: number;
  motivation: string;
}

export class UpdateFundingModel {
  @Validate(IsValueInEnumValidator, [FUNDING_STATUS])
  status: FUNDING_STATUS;
  schoolComment?: string;
}

// Request Query Models

export class QueryFundingStatusModel {
  @Validate(IsValueInEnumValidator, [FUNDING_STATUS])
  status?: FUNDING_STATUS = FUNDING_STATUS.PENDING;
}

// Response Models

export class FundingModel {
  id: number;
  createdAt: Date;
  name: string;
  amount: number;
  motivation: string;
  status: string;
  schoolComment?: string;
  association: {
    name: string;
  };
}
