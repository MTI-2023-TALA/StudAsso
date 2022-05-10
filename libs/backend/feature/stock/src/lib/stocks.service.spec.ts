import { Test, TestingModule } from '@nestjs/testing';

import { StockRepository } from '@stud-asso/backend/core/repository';
import { StocksService } from './stocks.service';

describe('StocksService', () => {
  let service: StocksService;
  let stockRepository: StockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        {
          provide: StockRepository,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
    stockRepository = module.get<StockRepository>(StockRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('associationRepository should be defined', () => {
    expect(stockRepository).toBeDefined();
  });
});
