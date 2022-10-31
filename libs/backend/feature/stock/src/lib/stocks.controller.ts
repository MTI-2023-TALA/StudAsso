import { Access, GetCurrentAssoId, GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { BadRequestException, Body, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import {
  CreateStockDto,
  QueryPaginationDto,
  QueryStockDto,
  StockDto,
  StockLogDto,
  StockLogWithUserDto,
  UpdateStockDto,
} from '@stud-asso/shared/dtos';
import { PermissionId } from '@stud-asso/shared/permission';
import { StocksService } from './stocks.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Access(PermissionId.STOCK_MANAGEMENT)
  @Post()
  public async create(
    @GetCurrentUserId() userId: number,
    @GetCurrentAssoId() assoId: number,
    @Body() createStockDto: CreateStockDto
  ): Promise<StockDto> {
    return await this.stocksService.create(userId, assoId, createStockDto);
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get('asso')
  public async findAllAsso(@GetCurrentAssoId() id: number, @Query() query: QueryStockDto): Promise<StockDto[]> {
    try {
      return await this.stocksService.findAllAsso(id, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get('assologs')
  public async findAllAssoStockLogs(
    @GetCurrentAssoId() assoId: number,
    @Query() query: QueryPaginationDto
  ): Promise<StockLogWithUserDto[]> {
    try {
      return await this.stocksService.findAllAssoStockLogs(assoId, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get('logs/:id')
  public async findSpecificStockLogs(
    @Param('id') stockId: string,
    @Query() query: QueryPaginationDto
  ): Promise<StockLogDto[]> {
    try {
      return await this.stocksService.findSpecificStockLogs(+stockId, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<StockDto> {
    try {
      return await this.stocksService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_MANAGEMENT)
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() updateStockDto: UpdateStockDto
  ): Promise<StockDto> {
    try {
      return await this.stocksService.update(+id, userId, updateStockDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_MANAGEMENT)
  @Delete(':id')
  public async delete(@Param('id') id: string, @GetCurrentUserId() userId: number): Promise<StockDto> {
    try {
      return await this.stocksService.delete(+id, userId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
