import { IsNumber, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';

export const PAGINATION_BASE_OFFSET = 0;
export const PAGINATION_BASE_LIMIT = 25;

export class QueryPaginationDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset?: number = PAGINATION_BASE_OFFSET;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number = PAGINATION_BASE_LIMIT;
}
