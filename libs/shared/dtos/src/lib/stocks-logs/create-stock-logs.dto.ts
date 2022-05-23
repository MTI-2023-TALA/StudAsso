import { IsDate, IsInt, IsNotEmpty, Min } from 'class-validator';

import { CreateBaseDto } from '../base/create-base.dto';

export class CreateStockLogsDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsInt()
  stockId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  oldCount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  newCount: number;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}
