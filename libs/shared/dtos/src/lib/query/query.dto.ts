import { IsNumber, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';

export class QueryPaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
