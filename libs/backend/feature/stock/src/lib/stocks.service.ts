import { AssociationRepository, StockLogsRepository, StockRepository } from '@stud-asso/backend/core/repository';
import {
  CreateStockDto,
  CreateStockLogsDto,
  StockDto,
  StockLogsDto,
  StockLogsWithUserDto,
  UpdateStockDto,
} from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class StocksService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly stockRepository: StockRepository,
    private readonly stockLogsRepository: StockLogsRepository
  ) {}

  public async create(userId: number, createBaseDto: CreateStockDto): Promise<StockDto> {
    try {
      const createdStock: StockDto = await this.stockRepository.create(createBaseDto);
      await this.createStocksLogs(createdStock.id, userId, createdStock.count, createdStock.count, 'create');
      return createdStock;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta.field_name === 'association (index)') {
          throw new Error('Association Not Found');
        }
      }
    }
  }

  public async findAll(): Promise<StockDto[]> {
    return this.stockRepository.findAll();
  }

  public async findAllAsso(id: number): Promise<StockDto[]> {
    const asso = await this.associationRepository.findOne(id);
    if (!asso) {
      throw new Error('Association Not Found');
    }
    return await this.stockRepository.findAllAsso(id);
  }

  public async findAllAssoStockLogs(associationId: number): Promise<StockLogsWithUserDto[]> {
    const asso = await this.associationRepository.findOne(associationId);
    if (!asso) {
      throw new Error('Association Not Found');
    }
    return await this.stockLogsRepository.findAllAssoStockLogs(associationId);
  }

  public async findSpecificStockLogs(stockId: number): Promise<StockLogsDto[]> {
    const stock = await this.stockRepository.findOne(stockId);
    if (!stock) {
      throw new Error('Stock Not Found');
    }
    return await this.stockLogsRepository.findSpecificStockLogs(stockId);
  }

  public async findOne(id: number): Promise<StockDto> {
    const stock = await this.stockRepository.findOne(id);
    if (!stock) {
      throw new Error('Stock Not Found');
    }
    return stock;
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
    if (!stockBeforeDelete) {
      throw new Error('Stock Not Found');
    }
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
  ): Promise<any> {
    if (action === 'create' || action === 'update' || action === 'delete') {
      const createStockLogsDto: CreateStockLogsDto = {
        stockId,
        userId,
        oldCount,
        newCount,
        action,
      };
      return await this.stockLogsRepository.create(createStockLogsDto);
    }
    throw new Error('Provided action has to be either: create, update or delete when creating a stock logs');
  }
}
