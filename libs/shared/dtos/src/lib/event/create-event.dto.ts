import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';
import { CreateBaseDto } from '../base/create-base.dto';

export class CreateEventDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date: Timestamp;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  associationId: number;
}
