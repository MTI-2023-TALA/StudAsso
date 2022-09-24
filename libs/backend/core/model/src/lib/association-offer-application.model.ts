// Request Models

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
