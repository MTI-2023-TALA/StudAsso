import { AssociationNameModel } from './association.model';
import { RoleNameModel } from './role.model';

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

export class AssociationOfferWithAssoAndRoleModel {
  id: number;
  deadLine: Date;
  association: AssociationNameModel;
  role: RoleNameModel;
}
