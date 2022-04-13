import { IsOptional, IsString } from 'class-validator';

import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateNewsFeedDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  content: string;
}
