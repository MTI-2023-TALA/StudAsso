import { CreateStockLogsDto } from '@stud-asso/shared/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StockLogs } from '@stud-asso/backend/core/orm';

@Injectable()
export class StockLogsRepository {
  constructor(@InjectRepository(StockLogs) private readonly stockLogsRepository: Repository<StockLogs>) {}

  public async create(createStockLogs: CreateStockLogsDto): Promise<any> {
    // TODO: Change type once we can upgrade @nestjs/typeorm
    return this.stockLogsRepository.save(createStockLogs);
  }
}
