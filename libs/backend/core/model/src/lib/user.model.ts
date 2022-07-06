import { AssociationIdAndNameModel } from './associations-member.model';

export class UserModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
  passwordHash: string;
  rtHash: string;
  googleId: string;
}

export class SimplifiedUserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}

export class UserIdAndEmailModel {
  id: number;
  email: string;
}

export class AssociationOfUserModel {
  id: number;
  associationsMembers: AssociationIdAndNameModel[];
}

export class UserByNameModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
