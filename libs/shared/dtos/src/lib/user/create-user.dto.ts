import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { CreateBaseDto } from '../base/create-base.dto';

export class CreateUserDto extends CreateBaseDto {
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
}
