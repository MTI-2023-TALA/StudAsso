import { SORT_ASSO_MEMBERS, SORT_ORDER } from '@stud-asso/shared/dtos';

import { QueryPaginationModel } from './query.model';
import { RoleNameModel } from './role.model';
import { UserIdAndUserModel } from './associations-member.model';

// Request Models

export class CreateAssociationModel {
  name: string;
  description?: string;
}

// Query Request Models

export class QueryAssociationMembersModel extends QueryPaginationModel {
  sort?: SORT_ASSO_MEMBERS = SORT_ASSO_MEMBERS.BY_ROLE_NAME;
  order?: SORT_ORDER = SORT_ORDER.ASC;
  filter?: string;
}

// Response Models

export class AssociationModel {
  id: number;
  name: string;
  description?: string;
}

export class AssociationWithPresidentModel {
  id: number;
  name: string;
  description?: string;
  associationsMembers: UserIdAndUserModel[];
}

export class AssociationPresidentModel {
  associationsMembers: UserIdAndUserModel[];
}

export class AssociationNameModel {
  id: number;
  name: string;
}

export class AssociationAndRoleNameModel {
  role: RoleNameModel;
  association: AssociationNameModel;
}
