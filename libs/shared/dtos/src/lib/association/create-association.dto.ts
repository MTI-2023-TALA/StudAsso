import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateBaseDto } from '../base/create-base.dto';

export class CreateAssociationDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  presidentId: number;

  @IsOptional()
  @IsString()
  description: string;
}
