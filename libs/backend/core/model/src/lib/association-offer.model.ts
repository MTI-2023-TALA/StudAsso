// Request Models
export class CreateAssociationOfferModel {
  associationId: number;
  roleId: number;
  deadLine: Date;
}

// response Models
export class AssociationOfferModel {
  id: number;
  associationId: number;
  roleId: number;
  deadLine: Date;
}
