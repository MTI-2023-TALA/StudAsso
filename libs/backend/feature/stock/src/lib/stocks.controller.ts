import {
  BadRequestException,
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStockDto, StockDto, StockLogsDto, StockLogsWithUserDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { StocksService } from './stocks.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  public async create(@GetCurrentUserId() userId: number, @Body() createStockDto: CreateStockDto): Promise<StockDto> {
    try {
      return await this.stocksService.create(userId, createStockDto);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  @Get()
  public async findAll(): Promise<StockDto[]> {
    return this.stocksService.findAll();
  }

  @Get('asso/:id')
  public async findAllAsso(@Param('id') id: string): Promise<StockDto[]> {
    try {
      return await this.stocksService.findAllAsso(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('assologs/:id')
  public async findAllAssoStockLogs(@Param('id') assoId: string): Promise<StockLogsWithUserDto[]> {
    try {
      return await this.stocksService.findAllAssoStockLogs(+assoId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('logs/:id')
  public async findSpecificStockLogs(@Param('id') stockId: string): Promise<StockLogsDto[]> {
    try {
      return await this.stocksService.findSpecificStockLogs(+stockId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<StockDto> {
    try {
      return await this.stocksService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() updateStockDto: UpdateStockDto
  ): Promise<any> {
    try {
      return await this.stocksService.update(+id, userId, updateStockDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @GetCurrentUserId() userId: number): Promise<any> {
    //TODO: soft delete and careful with stock logs
    try {
      return await this.stocksService.delete(+id, userId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
