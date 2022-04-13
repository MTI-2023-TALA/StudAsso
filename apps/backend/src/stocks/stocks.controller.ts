import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';

import { CreateStockDto, StockDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { StocksService } from './stocks.service';
import { UpdateResult } from 'typeorm';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto): Promise<StockDto> {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<StockDto[]> {
    return this.stocksService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<StockDto> {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto): Promise<UpdateResult> {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.stocksService.remove(+id);
  }
}
