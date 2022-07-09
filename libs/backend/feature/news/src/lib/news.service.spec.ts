import { CreateNewsDto, UpdateNewsDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { NewsRepository } from '@stud-asso/backend/core/repository';
import { NewsService } from './news.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockedNewsFeed = [
  {
    id: 1,
    userId: 1,
    associationId: 1,
    content: 'content1',
  },
  {
    id: 2,
    userId: 2,
    associationId: 2,
    content: 'content2',
  },
];

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('NewsService', () => {
  let service: NewsService;
  let repository: NewsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: NewsRepository,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockedNewsFeed[0])),
            findAll: jest.fn(() => Promise.resolve(mockedNewsFeed)),
            findOne: jest.fn(() => Promise.resolve(mockedNewsFeed[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    repository = module.get<NewsRepository>(NewsRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createNewsFeed', () => {
    it('should call NewsRepository.create with correct params', async () => {
      const createNewsFeedParams = { userId: 1, associationId: 1, content: 'content1' };
      const createNewsDto = plainToInstance(CreateNewsDto, createNewsFeedParams);
      const create = jest.spyOn(repository, 'create');

      const createResultRetrieved = await service.create(createNewsDto);
      expect(createResultRetrieved).toEqual(mockedNewsFeed[0]);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createNewsFeedParams);
    });
  });

  describe('findAllNewsFeed', () => {
    it('should call NewsRepository.findAll', async () => {
      const findAll = jest.spyOn(repository, 'findAll');

      const newsFeedRetrieved = await service.findAll();
      expect(newsFeedRetrieved).toEqual(mockedNewsFeed);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOneNewsFeed', () => {
    it('should call NewsRepository.findOne', async () => {
      const findOne = jest.spyOn(repository, 'findOne');

      const newsFeedRetrieved = await service.findOne(1);
      expect(newsFeedRetrieved).toEqual(mockedNewsFeed[0]);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateNewsFeed', () => {
    it('shoud call NewsRepository.update', async () => {
      const updateNewsDto = plainToInstance(UpdateNewsDto, { content: 'content renamed' });
      const update = jest.spyOn(repository, 'update');

      const updateResultRetrieved = await service.update(1, updateNewsDto);
      expect(updateResultRetrieved).toEqual(mockedUpdateResult);

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { content: 'content renamed' });
    });
  });

  describe('deleteNewsFeed', () => {
    it('shoud call NewsRepository.remove', async () => {
      const deleteCall = jest.spyOn(repository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual(mockedUpdateResult);

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });
  });
});
