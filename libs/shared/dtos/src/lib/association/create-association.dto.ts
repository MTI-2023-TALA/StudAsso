import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseDto } from '../base/create-base.dto';

export class CreateAssociationDto extends CreateBaseDto {

  @IsNotEmpty()
  @IsString()
  name: string;
}
