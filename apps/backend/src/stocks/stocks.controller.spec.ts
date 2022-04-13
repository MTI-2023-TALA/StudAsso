import { CreateMockService } from '@stud-asso/backend/utils/mock';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { TestingModule } from '@nestjs/testing';

describe('StocksController', () => {
  let controller: StocksController;

  beforeEach(async () => {
    const module: TestingModule = await CreateMockService([StocksController], {
      type: StocksService,
      // TODO: set mock value
      methods: { findAll: jest.fn().mockResolvedValue([42]) },
    });

    controller = module.get<StocksController>(StocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
