import { AssociationIdAndNameModel } from './associations-member.model';
import { IsEmail } from 'class-validator';

// Request Models

export class CreateUserModel {
  firstname: string;
  lastname: string;

  @IsEmail()
  email: string;
  isSchoolEmployee: boolean;
  passwordHash: string;
}

export class UpdateUserModel {
  firstname?: string;
  lastname?: string;

  @IsEmail()
  email?: string;
  isSchoolEmployee?: boolean;
  passwordHash?: string;
}

// Response Models

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

export class SimpleUserNoSchoolEmployeeModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export class UserIdAndEmailModel {
  id: number;
  email: string;
}

export class AssociationOfUserModel {
  id: number;
  associationsMembers: AssociationIdAndNameModel[];
}

export class UserWithoutIdModel {
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}
