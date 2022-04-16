import { CreateStockDto, UpdateStockDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend-core-base';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Stock } from '@stud-asso/backend/core/orm';

@Injectable()
export class StocksService extends BaseService<Stock, CreateStockDto, UpdateStockDto> {
  constructor(@InjectRepository(Stock) private readonly stockRepository: Repository<Stock>) {
    super(stockRepository);
  }
}
