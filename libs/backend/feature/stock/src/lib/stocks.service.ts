import { AssociationRepository, StockLogsRepository, StockRepository } from '@stud-asso/backend/core/repository';
import {
  CreateStockDto,
  CreateStockLogDto,
  QueryPaginationDto,
  QueryStockDto,
  StockDto,
  StockLogDto,
  StockLogWithUserDto,
  UpdateStockDto,
} from '@stud-asso/shared/dtos';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class StocksService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly stockRepository: StockRepository,
    private readonly stockLogsRepository: StockLogsRepository
  ) {}

  public async create(userId: number, associationId: number, createBaseDto: CreateStockDto): Promise<StockDto> {
    try {
      const stock = await this.stockRepository.findOneByName(createBaseDto.name);
      if (stock) {
        return this.stockRepository.update(stock.id, { count: stock.count + createBaseDto.count });
      }

      const createdStock: StockDto = await this.stockRepository.create({ ...createBaseDto, associationId });
      await this.createStocksLogs(createdStock.id, userId, createdStock.count, createdStock.count, 'create');
      return createdStock;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta.field_name === 'association (index)') {
          throw new Error(ERROR.ASSO_NOT_FOUND);
        }
      }
    }
  }

  public async findAllAsso(id: number, query: QueryStockDto): Promise<StockDto[]> {
    const asso = await this.associationRepository.findOne(id);
    if (!asso) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }
    return this.stockRepository.findAllAsso(id, query);
  }

  public async findAllAssoStockLogs(associationId: number, query: QueryPaginationDto): Promise<StockLogWithUserDto[]> {
    const asso = await this.associationRepository.findOne(associationId);
    if (!asso) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }
    return this.stockLogsRepository.findAllAssoStockLogs(associationId, query);
  }

  public async findSpecificStockLogs(stockId: number, query: QueryPaginationDto): Promise<StockLogDto[]> {
    const stock = await this.stockRepository.findOne(stockId);
    if (!stock) {
      throw new Error(ERROR.STOCK_NOT_FOUND);
    }
    return this.stockLogsRepository.findSpecificStockLogs(stockId, query);
  }

  public async findOne(id: number): Promise<StockDto> {
    const stock = await this.stockRepository.findOne(id);
    if (!stock) {
      throw new Error(ERROR.STOCK_NOT_FOUND);
    }
    return stock;
  }

  public async update(id: number, userId: number, updateStockDto: UpdateStockDto): Promise<StockDto> {
    const stockBeforeUpdate = await this.stockRepository.findOne(id);
    if (!stockBeforeUpdate) {
      throw new Error(ERROR.STOCK_NOT_FOUND);
    }
    const updatedStock = await this.stockRepository.update(id, updateStockDto);
    await this.createStocksLogs(id, userId, stockBeforeUpdate.count, updateStockDto.count, 'update');
    return updatedStock;
  }

  public async delete(id: number, userId: number): Promise<StockDto> {
    const stockBeforeDelete = await this.stockRepository.findOne(id);
    if (!stockBeforeDelete) {
      throw new Error(ERROR.STOCK_NOT_FOUND);
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
  ): Promise<CreateStockLogDto> {
    if (action === 'create' || action === 'update' || action === 'delete') {
      const createStockLogsDto: CreateStockLogDto = {
        stockId,
        userId,
        oldCount,
        newCount,
        action,
      };
      return this.stockLogsRepository.create(createStockLogsDto);
    }
    throw new Error(ERROR.BAD_STOCK_ACTION);
  }
}
