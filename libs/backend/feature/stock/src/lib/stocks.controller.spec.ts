import { CreateStockDto, StockDto, StockLogsDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockCreatedStockDto: StockDto = {
  id: 1,
  name: 'Coca',
  count: 10,
  associationId: 1,
};
const mockFindAllStocks: StockDto[] = [
  {
    id: 1,
    name: 'Coca',
    count: 10,
    associationId: 1,
  },
  {
    id: 2,
    name: 'Tea',
    count: 42,
    associationId: 1,
  },
];
const mockFindAllAssoLogs: StockLogsDto[] = [
  {
    id: 1,
    stockId: 1,
    userId: 1,
    oldCount: 10,
    newCount: 10,
    createdAt: new Date('2022-05-26'),
  },
  {
    id: 2,
    stockId: 2,
    userId: 1,
    oldCount: 42,
    newCount: 42,
    createdAt: new Date('2022-05-26'),
  },
];
const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('StocksController', () => {
  let controller: StocksController;
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [
        {
          provide: StocksService,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockCreatedStockDto)),
            findAll: jest.fn(() => Promise.resolve(mockFindAllStocks)),
            findAllAsso: jest.fn(() => Promise.resolve(mockFindAllStocks)),
            findAllAssoStockLogs: jest.fn(() => Promise.resolve(mockFindAllAssoLogs)),
            findOneStockLogs: jest.fn(() => Promise.resolve([mockFindAllAssoLogs[0]])),
            findOne: jest.fn(() => Promise.resolve(mockFindAllStocks[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    controller = module.get<StocksController>(StocksController);
    service = await module.get<StocksService>(StocksService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createStock', () => {
    it('should call stockService.create', async () => {
      const create = jest.spyOn(service, 'create');

      const createStockParams: CreateStockDto = { name: 'Coca', count: 10, associationId: 1 };
      const createdStock = await controller.create(1, createStockParams);
      expect(createdStock).toEqual(mockCreatedStockDto);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(1, createStockParams);
    });
  });

  describe('findAllStocks', () => {
    it('should call stockService.findAll', async () => {
      expect(await controller.findAll()).toEqual(mockFindAllStocks);
    });
  });

  describe('findAllAsso', () => {
    it('should call stockService.findAllAsso', async () => {
      expect(await controller.findAllAsso('1')).toEqual(mockFindAllStocks);
    });
  });

  describe('findAllAssoStockLogs', () => {
    it('should call stockService.findAllAssoStockLogs', async () => {
      expect(await controller.findAllAssoStockLogs('1')).toEqual(mockFindAllAssoLogs);
    });
  });

  describe('findOneStockLogs', () => {
    it('shoud call stockService.findOneStockLogs', async () => {
      expect(await controller.findOneStockLogs('1')).toEqual([mockFindAllAssoLogs[0]]);
    });
  });

  describe('findOneStock', () => {
    it('shoud call stockService.findOne', async () => {
      expect(await controller.findOne('1')).toEqual(mockFindAllStocks[0]);
    });
  });

  describe('updateStock', () => {
    it('should call stockService.update', async () => {
      const updateStockParams: UpdateStockDto = plainToInstance(UpdateStockDto, {
        name: 'Coca Zero',
      });
      expect(await controller.update('1', 1, updateStockParams)).toEqual(mockedUpdateResult);
    });
  });

  describe('deleteStock', () => {
    it('should call stockService.delete', async () => {
      expect(await controller.delete('1', 1)).toEqual(mockedUpdateResult);
    });
  });
});
