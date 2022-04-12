import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { CreateBaseDto } from '../base/create-base.dto';

export class CreateNewsFeedDto extends CreateBaseDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  associationId: number;

  @IsNotEmpty()
  @IsString()
  content: string;
}
