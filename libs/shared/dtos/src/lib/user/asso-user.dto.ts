import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AssoUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsArray()
  @IsOptional()
  associationsId: number[];
}