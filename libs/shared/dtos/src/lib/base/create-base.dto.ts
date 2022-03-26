import { IsEmpty } from 'class-validator';

export abstract class CreateBaseDto {
  @IsEmpty()
  id: string;

  @IsEmpty()
  createdAt: string;

  @IsEmpty()
  updatedAt: string;

  @IsEmpty()
  deletedAt: string;
}
