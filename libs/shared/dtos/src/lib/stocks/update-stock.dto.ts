import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { UpdateBaseDto } from '../base/update-base.dto';

export class UpdateStockDto extends UpdateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  count: number;
}
