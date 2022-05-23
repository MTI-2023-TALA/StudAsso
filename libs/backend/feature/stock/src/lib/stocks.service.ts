import { CreateStockDto, CreateStockLogsDto, StockDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { StockLogsRepository, StockRepository } from '@stud-asso/backend/core/repository';

import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

@Injectable()
export class StocksService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly stockLogsRepository: StockLogsRepository
  ) {}

  public async create(userId: number, createBaseDto: CreateStockDto): Promise<StockDto> {
    const createdStock: StockDto = await this.stockRepository.create(createBaseDto as any);
    const createStockLogsDto: CreateStockLogsDto = {
      stockId: createdStock.id,
      userId,
      oldCount: createdStock.count,
      newCount: createdStock.count,
    };

    await this.stockLogsRepository.create(createStockLogsDto);
    return createdStock;
  }

  public async findAll(): Promise<StockDto[]> {
    return this.stockRepository.findAll();
  }

  public async findAllAsso(id: number): Promise<StockDto[]> {
    return this.stockRepository.findAllAsso(id);
  }

  public async findOne(id: number): Promise<StockDto> {
    return this.stockRepository.findOne(id);
  }

  public async update(id: number, userId: number, updateBaseDto: UpdateStockDto): Promise<UpdateResult> {
    return this.stockRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number, userId: number): Promise<UpdateResult> {
    return this.stockRepository.delete(id);
  }
}
