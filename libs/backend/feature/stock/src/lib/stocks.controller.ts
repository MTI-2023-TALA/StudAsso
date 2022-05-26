import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateStockDto, StockDto, StockLogsDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { StocksService } from './stocks.service';
import { UpdateResult } from 'typeorm';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@GetCurrentUserId() userId: number, @Body() createStockDto: CreateStockDto): Promise<StockDto> {
    return this.stocksService.create(userId, createStockDto);
  }

  @Get()
  findAll(): Promise<StockDto[]> {
    return this.stocksService.findAll();
  }

  @Get('asso/:id')
  findAllAsso(@Param('id') id: string): Promise<StockDto[]> {
    return this.stocksService.findAllAsso(+id);
  }

  @Get('assologs/:id')
  findAllAssoLogs(@Param('id') assoId: string): Promise<StockLogsDto[]> {
    return this.stocksService.findAllAssoLogs(+assoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StockDto> {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() updateStockDto: UpdateStockDto
  ): Promise<UpdateResult> {
    return this.stocksService.update(+id, userId, updateStockDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetCurrentUserId() userId: number): Promise<UpdateResult> {
    return this.stocksService.delete(+id, userId);
  }
}
