import { IsDateString, IsOptional, IsString } from 'class-validator';

import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateEventDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  content: string;
}
