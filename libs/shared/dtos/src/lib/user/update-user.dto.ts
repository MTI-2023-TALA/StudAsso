import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateUserDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isSchoolEmployee: boolean;
}
