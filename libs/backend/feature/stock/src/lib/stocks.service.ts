import { CreateStockDto, UpdateStockDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend-core-base';
import { Injectable } from '@nestjs/common';
import { Stock } from '@stud-asso/backend/core/orm';
import { StockRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class StocksService extends BaseService<Stock, CreateStockDto, UpdateStockDto> {
  constructor(private readonly stockRepository: StockRepository) {
    super(stockRepository);
  }
}
