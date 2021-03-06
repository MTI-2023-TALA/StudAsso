import { CreateNewsDto, NewsDto, NewsWithAssoNameDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

const mockCreateNewsDto: CreateNewsDto = { associationId: 1, title: 'title', content: 'content' };
const mockfindAllNewsFeed: NewsDto[] = [
  {
    id: 1,
    userId: 1,
    associationId: 1,
    title: 'Title 1',
    content: 'content1',
    createdAt: new Date('07-07-2022'),
    updatedAt: new Date('08-07-2022'),
  },
  {
    id: 2,
    userId: 2,
    associationId: 2,
    title: 'Title 2',
    content: 'content2',
    createdAt: new Date('07-07-2022'),
    updatedAt: new Date('08-07-2022'),
  },
];
const mockFindAllNewsWithAssoName: NewsWithAssoNameDto[] = [
  {
    ...mockfindAllNewsFeed[0],
    associationName: 'Association 1',
  },
  {
    ...mockfindAllNewsFeed[1],
    associationName: 'Association 2',
  },
];
const mockedUpdateResult: UpdateResult = {
  raw: [],
  generatedMaps: [],
  affected: 1,
};

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: {
            create: jest.fn(() => Promise.resolve(mockCreateNewsDto)),
            findAllAssociationNews: jest.fn(() => Promise.resolve(mockfindAllNewsFeed)),
            findAllNewsWithAssoName: jest.fn(() => Promise.resolve(mockFindAllNewsWithAssoName)),
            findOne: jest.fn(() => Promise.resolve(mockfindAllNewsFeed[0])),
            update: jest.fn(() => Promise.resolve(mockedUpdateResult)),
            delete: jest.fn(() => Promise.resolve(mockedUpdateResult)),
          },
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    service = await module.get<NewsService>(NewsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createNewsFeed', () => {
    it('should call newsFeedService.create', async () => {
      const create = jest.spyOn(service, 'create');

      const createEventParams = { userId: 1, associationId: 1, title: 'title', content: 'content' };
      const createdNewsFeed = await controller.create(1, createEventParams);
      expect(createdNewsFeed).toEqual(mockCreateNewsDto);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(1, createEventParams);
    });
  });

  describe('findAllAssociationNews', () => {
    it('should call newsFeedService.findAllAssociationNews and succeed', async () => {
      expect(await controller.findAllAssociationNews('1')).toEqual(mockfindAllNewsFeed);
    });

    it('should call newsFeedService.findAllAssociationNews and fail', async () => {
      jest.spyOn(service, 'findAllAssociationNews').mockRejectedValue(new Error('Association Not Found'));
      expect(async () => controller.findAllAssociationNews('1')).rejects.toThrow(
        new NotFoundException('Association Not Found')
      );
    });
  });

  describe('findAllAssociationNewsWithAssoName', () => {
    it('should call newsFeedService.findAllNewsWithAssoName and succeed', async () => {
      expect(await controller.findAllNewsWithAssoName()).toEqual(mockFindAllNewsWithAssoName);
    });
  });

  describe('findOneNewsFeed', () => {
    it('shoud call newsFeedService.findOne', async () => {
      expect(await controller.findOne('1')).toEqual(mockfindAllNewsFeed[0]);
    });
  });

  describe('updateNewsFeed', () => {
    it('should call newsFeedService.update', async () => {
      expect(await controller.update('1', { content: 'content renamed', title: 'title renamed' })).toEqual(
        mockedUpdateResult
      );
    });
  });

  describe('deleteNewsFeed', () => {
    it('should call newsFeedService.delete', async () => {
      expect(await controller.delete('1')).toEqual(mockedUpdateResult);
    });
  });
});
