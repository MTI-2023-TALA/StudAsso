import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { CreateBaseDto } from '../base/create-base.dto';

export class CreateEventDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  associationId: number;
}
