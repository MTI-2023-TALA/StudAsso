import { CreateStockDto, CreateStockLogsDto, StockDto, StockLogsDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { StockLogsRepository, StockRepository } from '@stud-asso/backend/core/repository';

import { Injectable } from '@nestjs/common';
import { StockLogs } from '@stud-asso/backend/core/orm';
import { UpdateResult } from 'typeorm';

@Injectable()
export class StocksService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly stockLogsRepository: StockLogsRepository
  ) {}

  public async create(userId: number, createBaseDto: CreateStockDto): Promise<StockDto> {
    const createdStock: StockDto = await this.stockRepository.create(createBaseDto);
    await this.createStocksLogs(createdStock.id, userId, createdStock.count, createdStock.count, 'create');
    return createdStock;
  }

  public async findAll(): Promise<StockDto[]> {
    return this.stockRepository.findAll();
  }

  public async findAllAsso(id: number): Promise<StockDto[]> {
    return this.stockRepository.findAllAsso(id);
  }

  public async findAllAssoStockLogs(associationId: number): Promise<StockLogsDto[]> {
    return this.stockLogsRepository.findAllAssoStockLogs(associationId);
  }

  public async findSpecificStockLogs(stockId: number): Promise<StockLogsDto[]> {
    return this.stockLogsRepository.findSpecificStockLogs(stockId);
  }

  public async findOne(id: number): Promise<StockDto> {
    return this.stockRepository.findOne(id);
  }

  public async update(id: number, userId: number, updateBaseDto: UpdateStockDto): Promise<UpdateResult> {
    const stockBeforeUpdate = await this.stockRepository.findOne(id);
    const updatedStock = await this.stockRepository.update(id, updateBaseDto);
    await this.createStocksLogs(id, userId, stockBeforeUpdate.count, updateBaseDto.count, 'update');
    return updatedStock;
  }

  public async delete(id: number, userId: number): Promise<UpdateResult> {
    const stockBeforeDelete = await this.stockRepository.findOne(id);
    const deletedStock = await this.stockRepository.delete(id);
    await this.createStocksLogs(id, userId, stockBeforeDelete.count, 0, 'delete');
    return deletedStock;
  }

  private async createStocksLogs(
    stockId: number,
    userId: number,
    oldCount: number,
    newCount: number,
    action: string
  ): Promise<StockLogs> {
    if (action === 'create' || action === 'update' || action === 'delete') {
      const createStockLogsDto: CreateStockLogsDto = {
        stockId,
        userId,
        oldCount,
        newCount,
        action,
      };
      return this.stockLogsRepository.create(createStockLogsDto);
    }
    throw new Error('Provided action has to be either: create, update or delete when creating a stock logs');
  }
}
