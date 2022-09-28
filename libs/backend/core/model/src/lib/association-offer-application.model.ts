// Request Models

import { RoleNameModel } from './role.model';
import { SimpleUserNoSchoolEmployeeModel } from './user.model';

export class CreateAssociationOfferApplicationModel {
  associationOfferId: number;
  userId: number;
  motivation: string;
}

// Response Models

export class AssociationOfferApplicationModel {
  id: number;
  associationOfferId: number;
  userId: number;
  motivation: string;
}

export class AssociationOfferApplicationReviewModel {
  id: number;
  createdAt: Date;
  motivation: string;
  associationOffer: {
    id: number;
    role: RoleNameModel;
  };
  user: SimpleUserNoSchoolEmployeeModel;
}
