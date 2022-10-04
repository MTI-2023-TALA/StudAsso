import { FUNDING_STATUS } from '@stud-asso/shared/dtos';

// Request Models

export class CreateFundingModel {
  name: string;
  amount: number;
  motivation: string;
}

export class UpdateFundingModel {
  status: FUNDING_STATUS;
  schoolComment?: string;
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
