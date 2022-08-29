import { ConflictException, NotFoundException } from '@nestjs/common';
import { NewsDto, NewsWithAssoNameDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';

const mockCreateNewsDto: NewsDto = {
  id: 1,
  createdAt: new Date('2022-09-29'),
  updatedAt: new Date('2022-09-29'),
  userId: 1,
  associationId: 1,
  title: 'title',
  content: 'content',
};
const mockfindAllNewsFeed: NewsDto[] = [
  {
    id: 1,
    createdAt: new Date('07-07-2022'),
    updatedAt: new Date('07-07-2022'),
    userId: 1,
    associationId: 1,
    title: 'Title 1',
    content: 'content1',
  },
  {
    id: 2,
    createdAt: new Date('07-07-2022'),
    updatedAt: new Date('07-07-2022'),
    userId: 2,
    associationId: 2,
    title: 'Title 2',
    content: 'content2',
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
const mockedUpdateNews: NewsDto = {
  id: 1,
  createdAt: new Date('07-07-2022'),
  updatedAt: new Date('29-08-2022'),
  userId: 1,
  associationId: 1,
  title: 'Updated Title',
  content: 'title renamed',
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
            update: jest.fn(() => Promise.resolve(mockedUpdateNews)),
            delete: jest.fn(() => Promise.resolve(mockfindAllNewsFeed[0])),
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

      const createEventParams = { associationId: 1, title: 'title', content: 'content' };
      const createdNewsFeed = await controller.create(1, createEventParams);
      expect(createdNewsFeed).toEqual(mockCreateNewsDto);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(1, createEventParams);
    });

    it('should call newsFeedService.create and fail because an error has been raised', async () => {
      const create = jest.spyOn(service, 'create').mockRejectedValue(new Error('User Not Found'));
      expect(() => controller.create(42, { associationId: 1, title: 'title', content: 'content' })).rejects.toThrow(
        new ConflictException('User Not Found')
      );
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(42, { associationId: 1, title: 'title', content: 'content' });
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

  describe('findOne', () => {
    it('should call newsFeedService.findOne', async () => {
      expect(await controller.findOne('1')).toEqual(mockfindAllNewsFeed[0]);
    });

    it('should call newsFeedService.findOne and fail because an error occured', () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new Error('News Not Found'));
      expect(() => controller.findOne('42')).rejects.toThrow(new NotFoundException('News Not Found'));
    });
  });

  describe('updateNewsFeed', () => {
    it('should call newsFeedService.update', async () => {
      expect(await controller.update('1', { content: 'content renamed', title: 'title renamed' })).toEqual(
        mockedUpdateNews
      );
    });

    it('should call newsFeedService.update and fail because an error occured', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new Error('News Not Found'));
      expect(() => controller.update('42', { content: 'content renamed', title: 'title renamed' })).rejects.toThrow(
        new NotFoundException('News Not Found')
      );
    });
  });

  describe('deleteNewsFeed', () => {
    it('should call newsFeedService.delete', async () => {
      expect(await controller.delete('1')).toEqual(mockfindAllNewsFeed[0]);
    });

    it('should call newsFeedService.delete and fail because an error occured', async () => {
      jest.spyOn(service, 'delete').mockRejectedValue(new Error('Event To Delete Not Found'));
      expect(() => controller.delete('42')).rejects.toThrow(new NotFoundException('Event To Delete Not Found'));
    });
  });
});
