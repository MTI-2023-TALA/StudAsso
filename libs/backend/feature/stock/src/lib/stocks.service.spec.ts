import 'reflect-metadata';

import { AssociationRepository, StockLogsRepository, StockRepository } from '@stud-asso/backend/core/repository';
import { CreateStockDto, StockLogWithUserDto, UpdateStockDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { AssociationModel } from '@stud-asso/backend/core/model';
import { StocksService } from './stocks.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockedStocks = [
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
    associationId: 2,
  },
];

const mockedStocksLogsWithUser: StockLogWithUserDto[] = [
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
    createdAt: new Date('2022-05-27'),
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

const mockedStocksLogs = [
  {
    id: 1,
    stockId: 1,
    userId: 1,
    oldCount: 10,
    newCount: 10,
    createdAt: new Date('2022-05-27'),
    action: 'create',
  },
];

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

const mockedAssociation: AssociationModel = {
  id: 0,
  name: 'Asso1',
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
            findAllAsso: jest.fn(() => Promise.resolve([mockedStocks[0]])),
            findOne: jest.fn(() => Promise.resolve(mockedStocks[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
        {
          provide: StockLogsRepository,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockedStocksLogs[0])),
            findAllAssoStockLogs: jest.fn(() => Promise.resolve(mockedStocksLogsWithUser)),
            findSpecificStockLogs: jest.fn(() => Promise.resolve(mockedStocksLogs)),
          },
        },
        {
          provide: AssociationRepository,
          useValue: {
            findOne: jest.fn(() => Promise.resolve(mockedAssociation)),
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
      const associationId = 1;
      const createStockParams = { name: 'Coca', count: 10 };
      const createStockDto = plainToInstance(CreateStockDto, createStockParams);

      const createLogs = jest.spyOn(stockLogsRepository, 'create');

      const createResultRetrieved = await service.create(1, associationId, createStockDto);
      expect(createResultRetrieved).toEqual(mockedStocks[0]);

      expect(createLogs).toHaveBeenCalledTimes(1);
      expect(createLogs).toHaveBeenCalledWith({ stockId: 1, userId: 1, oldCount: 10, newCount: 10, action: 'create' });
    });
  });

  describe('findAllStock', () => {
    it('should call stockRepository.findAll', async () => {
      const stocksRetrieved = await service.findAll({});
      expect(stocksRetrieved).toEqual(mockedStocks);
    });
  });

  describe('findAllAsso', () => {
    it('should call stockRepository.findAllAsso', async () => {
      const stocksOfAssoRetrieved = await service.findAllAsso(1, {});
      expect(stocksOfAssoRetrieved).toEqual([mockedStocks[0]]);
    });
  });

  describe('findAllAssoLogs', () => {
    it('should call stockRepository.findAllAssoLogs', async () => {
      const assoStocksLogsRetrieved = await service.findAllAssoStockLogs(1, {});
      expect(assoStocksLogsRetrieved).toEqual(mockedStocksLogsWithUser);
    });
  });

  describe('findSpecificStockLogs', () => {
    it('should call stockRepository.findSpecificStockLogs', async () => {
      const stockLogsRetrieved = await service.findSpecificStockLogs(1, {});
      expect(stockLogsRetrieved).toEqual(mockedStocksLogs);
    });
  });

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
      expect(createLogs).toHaveBeenCalledWith({ stockId: 1, userId: 1, oldCount: 10, newCount: 666, action: 'update' });
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
      expect(createLogs).toHaveBeenCalledWith({ stockId: 1, userId: 1, oldCount: 10, newCount: 0, action: 'delete' });
    });
  });
});
