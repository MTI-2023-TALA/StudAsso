import { CreateNewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { NewsFeed } from '@stud-asso/backend/core/orm';
import { NewsFeedRepository } from '@stud-asso/backend/core/repository';
import { NewsFeedService } from './news-feed.service';
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

const mockedNewsFeed = [
  plainToInstance(NewsFeed, {
    id: 1,
    userId: 1,
    associationId: 1,
    content: 'content1',
  }),
  plainToInstance(NewsFeed, {
    id: 2,
    userId: 2,
    associationId: 2,
    content: 'content2',
  }),
];

const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('NewsFeedService', () => {
  let service: NewsFeedService;
  let newsFeedRepository: NewsFeedRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsFeedService,
        {
          provide: NewsFeedRepository,
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

    service = module.get<NewsFeedService>(NewsFeedService);
    newsFeedRepository = module.get<NewsFeedRepository>(NewsFeedRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createNewsFeed', () => {
    it('should call newsFeedRepository.create with correct params', async () => {
      const createNewsFeedParams = { userId: 1, associationId: 1, content: 'content1' };
      const createNewsFeedDto = plainToInstance(CreateNewsFeedDto, createNewsFeedParams);
      const create = jest.spyOn(newsFeedRepository, 'create');

      const createResultRetrieved = await service.create(createNewsFeedDto);
      expect(createResultRetrieved).toEqual(mockedNewsFeed[0]);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createNewsFeedParams);
    });
  });

  describe('findAllNewsFeed', () => {
    it('should call newsFeedRepository.findAll', async () => {
      const findAll = jest.spyOn(newsFeedRepository, 'findAll');

      const newsFeedRetrieved = await service.findAll();
      expect(newsFeedRetrieved).toEqual(mockedNewsFeed);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOneNewsFeed', () => {
    it('should call newsFeedRepository.findOne', async () => {
      const findOne = jest.spyOn(newsFeedRepository, 'findOne');

      const newsFeedRetrieved = await service.findOne(1);
      expect(newsFeedRetrieved).toEqual(mockedNewsFeed[0]);

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('updateNewsFeed', () => {
    it('shoud call newsFeedRepository.update', async () => {
      const updateNewsFeedDto = plainToInstance(UpdateNewsFeedDto, { content: 'content renamed' });
      const update = jest.spyOn(newsFeedRepository, 'update');

      const updateResultRetrieved = await service.update(1, updateNewsFeedDto);
      expect(updateResultRetrieved).toEqual(mockedUpdateResult);

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, { content: 'content renamed' });
    });
  });

  describe('deleteNewsFeed', () => {
    it('shoud call newsFeedRepository.remove', async () => {
      const deleteCall = jest.spyOn(newsFeedRepository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual(mockedUpdateResult);

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });
  });
});
