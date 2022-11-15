import { AssociationNameModel } from './association.model';
import { RoleNameModel } from './role.model';
import { SimpleUserNoSchoolEmployeeModel } from './user.model';

// Request Models
export class CreateAssociationOfferModel {
  associationId: number;
  roleId: number;
  deadline: Date;
}

// response Models
export class AssociationOfferModel {
  id: number;
  associationId: number;
  roleId: number;
  deadline: Date;
}

export class AssociationOfferWithAssoAndRoleModel {
  id: number;
  deadline: Date;
  association: AssociationNameModel;
  role: RoleNameModel;
}

export class AssociationOfferStatsModel {
  id: number;
  deadline: Date;
  role: RoleNameModel;
  numberOfApplications: number;
}

export class AssociationOfferApplicantsModel {
  user: SimpleUserNoSchoolEmployeeModel;
}
