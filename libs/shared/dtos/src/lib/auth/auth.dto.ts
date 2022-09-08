import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;
}

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export type TokenDto = {
  accessToken: string;
  refreshToken: string;
};
