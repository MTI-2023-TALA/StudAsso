import { IsDateString, IsOptional, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';
import { UpdateBaseDto } from '../base/update-base.dto';
export class UpdateEventDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  date: Timestamp;

  @IsOptional()
  @IsString()
  content: string;
}
