import {
  CreateStockDto,
  CreateStockLogsDto,
  StockDto,
  StockLogsDto,
  StockLogsWithUserDto,
  UpdateStockDto,
} from '@stud-asso/shared/dtos';
import { StockLogsRepository, StockRepository } from '@stud-asso/backend/core/repository';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class StocksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly stockRepository: StockRepository,
    private readonly stockLogsRepository: StockLogsRepository
  ) {}

  public async create(userId: number, createBaseDto: CreateStockDto): Promise<StockDto> {
    // TODO: manage errors
    return await this.prismaService.$transaction(async (transaction) => {
      const createdStock: StockDto = await this.stockRepository.create(createBaseDto, transaction);
      await this.createStocksLogs(
        createdStock.id,
        userId,
        createdStock.count,
        createdStock.count,
        'create',
        transaction
      );
      return createdStock;
    });
  }

  public async findAll(): Promise<StockDto[]> {
    return this.stockRepository.findAll();
  }

  public async findAllAsso(id: number): Promise<StockDto[]> {
    return this.stockRepository.findAllAsso(id);
  }

  public async findAllAssoStockLogs(associationId: number): Promise<StockLogsWithUserDto[]> {
    return this.stockLogsRepository.findAllAssoStockLogs(associationId);
  }

  public async findSpecificStockLogs(stockId: number): Promise<StockLogsDto[]> {
    return this.stockLogsRepository.findSpecificStockLogs(stockId);
  }

  public async findOne(id: number): Promise<StockDto> {
    return this.stockRepository.findOne(id);
  }

  public async update(id: number, userId: number, updateBaseDto: UpdateStockDto): Promise<any> {
    const stockBeforeUpdate = await this.stockRepository.findOne(id);
    if (!stockBeforeUpdate) {
      throw new Error('Stock Not Found');
    }
    const updatedStock = await this.stockRepository.update(id, updateBaseDto);
    await this.createStocksLogs(id, userId, stockBeforeUpdate.count, updateBaseDto.count, 'update');
    return updatedStock;
  }

  public async delete(id: number, userId: number): Promise<any> {
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
    action: string,
    currentTransaction: any = null // TODO: Cannot put TransactionClient type
  ): Promise<any> {
    if (action === 'create' || action === 'update' || action === 'delete') {
      const createStockLogsDto: CreateStockLogsDto = {
        stockId,
        userId,
        oldCount,
        newCount,
        action,
      };
      return this.stockLogsRepository.create(createStockLogsDto, currentTransaction);
    }
    throw new Error('Provided action has to be either: create, update or delete when creating a stock logs');
  }
}
