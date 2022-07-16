import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

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

  @IsNotEmpty()
  @IsInt()
  associationId: number;
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
