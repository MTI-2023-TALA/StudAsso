import { Access, GetCurrentUserId } from '@stud-asso/backend-core-auth';
import {
  BadRequestException,
  Body,
  ConflictException,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStockDto, StockDto, StockLogDto, StockLogWithUserDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { PermissionId } from '@stud-asso/shared/permission';
import { StocksService } from './stocks.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Access(PermissionId.STOCK_MANAGEMENT)
  @Post()
  public async create(@GetCurrentUserId() userId: number, @Body() createStockDto: CreateStockDto): Promise<StockDto> {
    try {
      return await this.stocksService.create(userId, createStockDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get()
  public async findAll(): Promise<StockDto[]> {
    return this.stocksService.findAll();
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get('asso/:id')
  public async findAllAsso(@Param('id') id: string): Promise<StockDto[]> {
    try {
      return await this.stocksService.findAllAsso(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get('assologs/:id')
  public async findAllAssoStockLogs(@Param('id') assoId: string): Promise<StockLogWithUserDto[]> {
    try {
      return await this.stocksService.findAllAssoStockLogs(+assoId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.STOCK_READ, PermissionId.STOCK_MANAGEMENT)
  @Get('logs/:id')
  public async findSpecificStockLogs(@Param('id') stockId: string): Promise<StockLogDto[]> {
    try {
      return await this.stocksService.findSpecificStockLogs(+stockId);
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
    //TODO: soft delete and careful with stock logs
    try {
      return await this.stocksService.delete(+id, userId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
