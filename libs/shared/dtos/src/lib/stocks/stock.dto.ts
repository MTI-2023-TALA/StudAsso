import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min, Validate } from 'class-validator';
import { QueryPaginationDto, SORT_ORDER } from '../query/query.dto';

import { IsValueInEnumValidator } from '../validators/enum-validator';
import { UserDto } from '../user/user.dto';

// Request DTOs

export class CreateStockDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  count: number;
}

export class UpdateStockDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  count: number;
}

export class CreateStockLogDto {
  @IsNotEmpty()
  @IsInt()
  stockId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  oldCount: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  newCount: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['create', 'update', 'delete'])
  action: string;
}

// Query Request DTOs

export enum SORT_STOCK {
  BY_COUNT = 'count',
  BY_NAME = 'name',
}

export class QueryStockDto extends QueryPaginationDto {
  @IsOptional()
  @IsString()
  @Validate(IsValueInEnumValidator, [SORT_STOCK])
  sort?: SORT_STOCK = SORT_STOCK.BY_NAME;

  @IsOptional()
  @IsString()
  @Validate(IsValueInEnumValidator, [SORT_ORDER])
  order?: SORT_ORDER = SORT_ORDER.ASC;

  @IsOptional()
  @IsString()
  filter?: string;
}

// Response DTOs

export class StockDto {
  id: number;
  name: string;
  count: number;
  associationId: number;
}

export class StockNameDto {
  name: string;
}

export class StockLogDto {
  id: number;
  stockId: number;
  userId: number;
  oldCount: number;
  newCount: number;
  action: string;
  createdAt: Date;
}

export class StockLogWithUserDto {
  id: number;
  stockId: number;
  oldCount: number;
  newCount: number;
  action: string;
  createdAt: Date;
  user: UserDto;
  stock: StockNameDto;
}
