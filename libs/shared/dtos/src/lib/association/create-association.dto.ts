import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import { CreateBaseDto } from '../base/create-base.dto';

export class CreateAssociationDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  presidentId: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
