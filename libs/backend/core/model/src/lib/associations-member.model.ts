import { AssociationNameModel } from './association.model';

export class AssociationsMemberModel {
  associationId: number;
  userId: number;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class AssociationIdAndNameModel {
  associationId: number;
  association: AssociationNameModel;
}
