import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Request DTOs

export class CreateNewsDto {
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

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  content: string;
}

// Response DTOs

export class NewsDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  associationId: number;
  content: string;
}
