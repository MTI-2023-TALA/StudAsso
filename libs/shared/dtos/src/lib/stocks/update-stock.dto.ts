import { IsInt, IsOptional, IsString, Min } from 'class-validator';

import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateStockDto extends UpdateBaseDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  count: number;
}
