import { CreateStockDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { Stock, StockLogs } from '@stud-asso/backend/core/orm';
import { StockLogsRepository, StockRepository } from '@stud-asso/backend/core/repository';
import { Test, TestingModule } from '@nestjs/testing';

import { StocksService } from './stocks.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockedStocks: Stock[] = [
  plainToInstance(Stock, {
    id: 1,
    name: 'Coca',
    count: 10,
    associationId: 1,
  }),
  plainToInstance(Stock, {
    id: 2,
    name: 'Tea',
    count: 42,
    associationId: 1,
  }),
];
const mockedStocksLogs: StockLogs[] = [
  plainToInstance(StockLogs, {
    id: 1,
    stockId: 1,
    userId: 1,
    oldCount: 10,
    newCount: 10,
    createdAt: new Date('2022-05-27'),
  }),
  plainToInstance(StockLogs, {
    id: 2,
    stockId: 2,
    userId: 1,
    oldCount: 42,
    newCount: 42,
    createdAt: new Date('2022-05-27'),
  }),
];

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('StocksService', () => {
  let service: StocksService;
  let stockRepository: StockRepository;
  let stockLogsRepository: StockLogsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StocksService,
        {
          provide: StockRepository,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockedStocks[0])),
            findAll: jest.fn(() => Promise.resolve(mockedStocks)),
            findOne: jest.fn(() => Promise.resolve(mockedStocks[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
        {
          provide: StockLogsRepository,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockedStocksLogs[0])),
            findAllAssoStockLogs: jest.fn(() => Promise.resolve(mockedStocksLogs)),
            findOneStockLogs: jest.fn(() => Promise.resolve([mockedStocksLogs[0]])),
          },
        },
      ],
    }).compile();

    service = module.get<StocksService>(StocksService);
    stockRepository = module.get<StockRepository>(StockRepository);
    stockLogsRepository = module.get<StockLogsRepository>(StockLogsRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createStock', () => {
    it('should call stockRepository.create with correct params', async () => {
      const createStockParams = { name: 'Coca', count: 10, associationId: 1 };
      const createStockDto = plainToInstance(CreateStockDto, createStockParams);

      const create = jest.spyOn(stockRepository, 'create');
      const createLogs = jest.spyOn(stockLogsRepository, 'create');

      const createResultRetrieved = await service.create(1, createStockDto);
      expect(createResultRetrieved).toEqual(mockedStocks[0]);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createStockParams);
      expect(createLogs).toHaveBeenCalledTimes(1);
      expect(createLogs).toHaveBeenCalledWith({ stockId: 1, userId: 1, oldCount: 10, newCount: 10 });
    });
  });

  describe('findAllStock', () => {
    it('should call stockRepository.findAll', async () => {
      const findAll = jest.spyOn(stockRepository, 'findAll');

      const stocksRetrieved = await service.findAll();
      expect(stocksRetrieved).toEqual(mockedStocks);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  // TODO: findAllAsso

  // TODO: findAllAssoLogs

  // TODO: findOneStockLogs

  describe('findOneStock', () => {
    it('should call stockRepository.findOne', async () => {
      const findOne = jest.spyOn(stockRepository, 'findOne');

      const stockRetrieved = await service.findOne(1);
      expect(stockRetrieved).toEqual(mockedStocks[0]);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateStock', () => {
    it('shoud call stockRepository.update', async () => {
      const updateStockDto = plainToInstance(UpdateStockDto, { name: 'Coca Zero', count: 666 });
      const findOne = jest.spyOn(stockRepository, 'findOne');
      const update = jest.spyOn(stockRepository, 'update');
      const createLogs = jest.spyOn(stockLogsRepository, 'create');

      const updateResultRetrieved = await service.update(1, 1, updateStockDto);
      expect(updateResultRetrieved).toEqual(mockedUpdateResult);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { name: 'Coca Zero', count: 666 });
      expect(createLogs).toHaveBeenCalledTimes(1);
      expect(createLogs).toHaveBeenCalledWith({ stockId: 1, userId: 1, oldCount: 10, newCount: 666 });
    });
  });

  describe('deleteStock', () => {
    it('should call stockRepository.delete', async () => {
      const findOne = jest.spyOn(stockRepository, 'findOne');
      const deleteCall = jest.spyOn(stockRepository, 'delete');
      const createLogs = jest.spyOn(stockLogsRepository, 'create');

      const deleteResultRetrieved = await service.delete(1, 1);
      expect(deleteResultRetrieved).toEqual(mockedUpdateResult);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
      expect(createLogs).toHaveBeenCalledTimes(1);
      expect(createLogs).toHaveBeenCalledWith({ stockId: 1, userId: 1, oldCount: 10, newCount: 0 });
    });
  });
});
