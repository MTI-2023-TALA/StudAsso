import { BadRequestException, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateStockDto, StockDto, StockLogsDto, StockLogsWithUserDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { StocksService } from './stocks.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';
import { UpdateResult } from 'typeorm';

@SwaggerController('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  public async create(@GetCurrentUserId() userId: number, @Body() createStockDto: CreateStockDto): Promise<StockDto> {
    return this.stocksService.create(userId, createStockDto);
  }

  @Get()
  public async findAll(): Promise<StockDto[]> {
    return this.stocksService.findAll();
  }

  @Get('asso/:id')
  public async findAllAsso(@Param('id') id: string): Promise<StockDto[]> {
    return this.stocksService.findAllAsso(+id);
  }

  @Get('assologs/:id')
  public async findAllAssoStockLogs(@Param('id') assoId: string): Promise<StockLogsWithUserDto[]> {
    return this.stocksService.findAllAssoStockLogs(+assoId);
  }

  @Get('logs/:id')
  public async findSpecificStockLogs(@Param('id') stockId: string): Promise<StockLogsDto[]> {
    return this.stocksService.findSpecificStockLogs(+stockId);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<StockDto> {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() updateStockDto: UpdateStockDto
  ): Promise<UpdateResult> {
    try {
      return await this.stocksService.update(+id, userId, updateStockDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @GetCurrentUserId() userId: number): Promise<UpdateResult> {
    //TODO: soft delete and careful with stock logs
    return this.stocksService.delete(+id, userId);
  }
}
