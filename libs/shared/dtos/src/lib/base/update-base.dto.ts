import { IsEmpty } from 'class-validator';

export abstract class UpdateBaseDto {
  @IsEmpty()
  id: number;

  @IsEmpty()
  createdAt: string;

  @IsEmpty()
  updatedAt: string;

  @IsEmpty()
  deletedAt: string;
}
