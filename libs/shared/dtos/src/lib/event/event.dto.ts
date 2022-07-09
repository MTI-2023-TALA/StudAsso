import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Request DTOs

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsInt()
  associationId: number;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  content: string;
}

// Response DTOs

export class EventDto {
  id: number;
  name: string;
  date: Date;
  content: string;
  associationId: number;
}
