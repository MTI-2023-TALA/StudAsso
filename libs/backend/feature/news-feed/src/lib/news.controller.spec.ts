import { Test, TestingModule } from '@nestjs/testing';

import { NewsController } from './news.controller';
import { NewsFeedDto } from '@stud-asso/shared/dtos';
import { NewsFeedService } from './news.service';
import { UpdateResult } from 'typeorm';

const mockCreateNewsFeedDto: NewsFeedDto = { id: 1, userId: 1, associationId: 1, content: 'content' };
const mockfindAllNewsFeed: NewsFeedDto[] = [
  { id: 1, userId: 1, associationId: 1, content: 'content1' },
  { id: 2, userId: 2, associationId: 2, content: 'content2' },
];
const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsFeedService,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockCreateNewsFeedDto)),
            findAll: jest.fn(() => Promise.resolve(mockfindAllNewsFeed)),
            findOne: jest.fn(() => Promise.resolve(mockfindAllNewsFeed[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    service = await module.get<NewsFeedService>(NewsFeedService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createNewsFeed', () => {
    it('should call newsFeedService.create', async () => {
      const create = jest.spyOn(service, 'create');

      const createEventParams = { userId: 1, associationId: 1, content: 'content' };
      const createdNewsFeed = await controller.create(createEventParams);
      expect(createdNewsFeed).toEqual(mockCreateNewsFeedDto);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createEventParams);
    });
  });

  describe('findAllNewsFeed', () => {
    it('should call newsFeedService.findAll', async () => {
      expect(await controller.findAll()).toEqual(mockfindAllNewsFeed);
    });
  });

  describe('findOneNewsFeed', () => {
    it('shoud call newsFeedService.findOne', async () => {
      expect(await controller.findOne('1')).toEqual(mockfindAllNewsFeed[0]);
    });
  });

  describe('updateNewsFeed', () => {
    it('should call newsFeedService.update', async () => {
      expect(await controller.update('1', { content: 'content renamed' })).toEqual(mockedUpdateResult);
    });
  });

  describe('deleteNewsFeed', () => {
    it('should call newsFeedService.delete', async () => {
      expect(await controller.delete('1')).toEqual(mockedUpdateResult);
    });
  });
});
