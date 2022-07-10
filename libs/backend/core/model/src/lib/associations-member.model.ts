import { UserFirstnameAndLastnameModel, UserWithoutIdModel } from './user.model';

import { AssociationNameModel } from './association.model';
import { RoleNameModel } from './role.model';

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

export class AssociationMemberWithRoleWithoutIdsModel {
  user: UserFirstnameAndLastnameModel;
  role: RoleNameModel;
}

export class UserIdAndUserModel {
  userId: number;
  user: UserWithoutIdModel;
}
