import { AssociationNameModel } from './association.model';
import { UserWithoutIdModel } from './user.model';

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

export class UserIdAndUserModel {
  userId: number;
  user: UserWithoutIdModel;
}
