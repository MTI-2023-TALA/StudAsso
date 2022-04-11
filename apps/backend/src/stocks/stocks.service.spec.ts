import { Test, TestingModule } from '@nestjs/testing';
import { CreateMockRepo } from '@stud-asso/backend/utils/mock';
import { Stock } from './entities/stock.entity';
import { StocksService } from './stocks.service';

describe('StocksService', () => {
  let service: StocksService;

  const mockRepo = {
    // TODO set mock value
    find: jest.fn().mockResolvedValue(42),
  };

  beforeEach(async () => {
    const module: TestingModule = await CreateMockRepo(StocksService, Stock, mockRepo);

    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
