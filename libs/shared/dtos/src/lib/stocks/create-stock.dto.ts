import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

import { CreateBaseDto } from '../base/create-base.dto';

export class CreateStockDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  count: number;

  @IsNotEmpty()
  @IsInt()
  associationId: number;
}
