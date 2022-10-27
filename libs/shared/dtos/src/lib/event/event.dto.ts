import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { QueryPaginationDto } from '../query/query.dto';
import { Transform } from 'class-transformer';

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

// Query Request DTOs

export class QueryEventDto extends QueryPaginationDto {
  @IsBoolean()
  @Transform(({ value }) => {
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  isActive: boolean;
}

// Response DTOs

export class EventDto {
  id: number;
  name: string;
  date: Date;
  content: string;
  associationId: number;
  associationName: string;
}
