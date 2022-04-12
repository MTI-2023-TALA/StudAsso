import { IsDate, IsOptional, IsString } from 'class-validator';
import { UpdateBaseDto } from '../base/update-base.dto';
export class UpdateEventDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  content: string;
}
