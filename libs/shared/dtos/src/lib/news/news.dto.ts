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
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  title: string;

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
  title: string;
  content: string;
}
