import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { AssociationIdAndNameDto } from '../associations-member/associations-member.dto';

// Request DTOs

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  isSchoolEmployee: boolean;

  @IsNotEmpty()
  @IsString()
  passwordHash: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isSchoolEmployee?: boolean;
}

export class UpdateUserFirstLastNameDto {
  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;
}

// Response DTOs

export class UserDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}

export class UserIdAndEmailDto {
  id: number;
  email: string;
}

export class SimpleUserDto {
  firstname: string;
  lastname: string;
  email: string;
  isSchoolEmployee: boolean;
}

export class SimpleUserNoSchoolEmployeeDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

export class AssociationOfUserDto {
  id: number;
  associationsId: AssociationIdAndNameDto[];
}
