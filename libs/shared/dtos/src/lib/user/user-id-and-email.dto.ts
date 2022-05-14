import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

import { CreateBaseDto } from '../base/create-base.dto';

export class UserIdAndEmail extends CreateBaseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
