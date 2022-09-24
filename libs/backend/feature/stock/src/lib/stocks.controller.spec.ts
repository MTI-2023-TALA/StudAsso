import { CreateStockDto, StockDto, StockLogDto, StockLogWithUserDto, UpdateStockDto } from '@stud-asso/shared/dtos';
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
const mockFindAllAssoLogs: StockLogWithUserDto[] = [
  {
    id: 1,
    stockId: 1,
    oldCount: 10,
    newCount: 10,
    createdAt: new Date('2022-05-26'),
    action: 'create',
    user: {
      id: 1,
      firstname: 'John',
      lastname: 'Cena',
      email: 'johncena@gmail.com',
      isSchoolEmployee: false,
    },
    stock: {
      name: 'Coca',
    },
  },
  {
    id: 2,
    stockId: 2,
    oldCount: 42,
    newCount: 42,
    createdAt: new Date('2022-05-26'),
    action: 'create',
    user: {
      id: 1,
      firstname: 'John',
      lastname: 'Cena',
      email: 'johncena@gmail.com',
      isSchoolEmployee: false,
    },
    stock: {
      name: 'Tea',
    },
  },
];
const mockFindSpecificStockLogs: StockLogDto[] = [
  { id: 1, stockId: 1, userId: 1, oldCount: 10, newCount: 10, createdAt: new Date('2022-05-26'), action: 'create' },
];

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('StocksController', () => {
  let controller: StocksController;

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
            findSpecificStockLogs: jest.fn(() => Promise.resolve(mockFindSpecificStockLogs)),
            findOne: jest.fn(() => Promise.resolve(mockFindAllStocks[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    controller = module.get<StocksController>(StocksController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createStock', () => {
    it('should call stockService.create', async () => {
      const associationId = 1;
      const createStockParams: CreateStockDto = { name: 'Coca', count: 10 };
      const createdStock = await controller.create(1, associationId, createStockParams);
      expect(createdStock).toEqual(mockCreatedStockDto);
    });
  });

  describe('findAllStocks', () => {
    it('should call stockService.findAll', async () => {
      expect(await controller.findAll()).toEqual(mockFindAllStocks);
    });
  });

  describe('findAllAsso', () => {
    it('should call stockService.findAllAsso', async () => {
      expect(await controller.findAllAsso(1)).toEqual(mockFindAllStocks);
    });
  });

  describe('findAllAssoStockLogs', () => {
    it('should call stockService.findAllAssoStockLogs', async () => {
      expect(await controller.findAllAssoStockLogs(1)).toEqual(mockFindAllAssoLogs);
    });
  });

  describe('findSpecificStockLogs', () => {
    it('shoud call stockService.findSpecificStockLogs', async () => {
      expect(await controller.findSpecificStockLogs('1')).toEqual(mockFindSpecificStockLogs);
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
