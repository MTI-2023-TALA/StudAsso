import { CreateStockDto, StockDto, UpdateStockDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { StockRepository } from '@stud-asso/backend/core/repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class StocksService {
  constructor(private readonly stockRepository: StockRepository) {}

  public async create(createBaseDto: CreateStockDto): Promise<any> {
    return this.stockRepository.create(createBaseDto as any);
  }

  public async findAll(): Promise<StockDto[]> {
    return this.stockRepository.findAll();
  }

  public async findOne(id: number): Promise<StockDto> {
    return this.stockRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateStockDto): Promise<UpdateResult> {
    return this.stockRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number): Promise<UpdateResult> {
    return this.stockRepository.delete(id);
  }
}
