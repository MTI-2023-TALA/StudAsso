import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@stud-asso/backend/utils/base';
import { CreateStockDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService extends BaseService<Stock, CreateStockDto, UpdateStockDto> {
  constructor(@InjectRepository(Stock) private readonly stockRepository: Repository<Stock>) {
    super(stockRepository);
  }
}
