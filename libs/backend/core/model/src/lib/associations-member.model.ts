import { SimpleUserNoSchoolEmployeeModel, UserWithoutIdModel } from './user.model';

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

export class SimpleAssociationsMemberModel {
  associationId: number;
  userId: number;
  roleId: number;
}

export class AssociationIdAndNameModel {
  associationId: number;
  association: AssociationNameModel;
}

export class AssociationMemberWithRoleWithoutIdsModel {
  user: SimpleUserNoSchoolEmployeeModel;
  role: RoleNameModel;
}

export class UserIdAndUserModel {
  userId: number;
  user: UserWithoutIdModel;
}

export class AddRoleToUserModel {
  associationId: number;
  userId: number;
  roleId: number;
}

export class UserIdAssoIdModel {
  userId: number;
  assoId: number;
}

export class AssoMemberPermissionsModel {
  role: {
    permissions: string[];
  };
}
