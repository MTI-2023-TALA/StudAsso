import { CreateMockRepo } from '@stud-asso/backend/utils/mock';
import { Stock } from '@stud-asso/backend/core/orm';
import { StocksService } from './stocks.service';
import { TestingModule } from '@nestjs/testing';

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
