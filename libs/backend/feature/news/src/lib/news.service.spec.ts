import { AssociationRepository, NewsRepository } from '@stud-asso/backend/core/repository';
import { CreateNewsDto, UpdateNewsDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { NewsService } from './news.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('NewsService', () => {
  let service: NewsService;
  let associationRepository: AssociationRepository;
  let repository: NewsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: NewsRepository,
          useValue: {
            create: jest.fn(() =>
              Promise.resolve({
                id: 1,
                createdAt: new Date('2022-09-29'),
                updatedAt: new Date('2022-09-29'),
                userId: 1,
                associationId: 1,
                title: 'title',
                content: 'content',
              })
            ),
            findAllAssociationNews: jest.fn(() =>
              Promise.resolve([
                {
                  id: 1,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 1,
                  associationId: 1,
                  title: 'title 1',
                  content: 'content1',
                },
                {
                  id: 3,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 1,
                  associationId: 1,
                  title: 'title 3',
                  content: 'content3',
                },
              ])
            ),
            findAllNewsWithAssoName: jest.fn(() =>
              Promise.resolve([
                {
                  id: 1,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 1,
                  associationId: 1,
                  title: 'title 1',
                  content: 'content1',
                  association: {
                    name: 'association 1',
                  },
                },
                {
                  id: 2,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 2,
                  associationId: 2,
                  title: 'title 2',
                  content: 'content2',
                  association: {
                    name: 'association 2',
                  },
                },
                {
                  id: 3,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 1,
                  associationId: 1,
                  title: 'title 3',
                  content: 'content3',
                  association: {
                    name: 'association 1',
                  },
                },
              ])
            ),
            findOne: jest.fn((newsId: number) => {
              if (newsId === 1) {
                return Promise.resolve({
                  id: 1,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 1,
                  associationId: 1,
                  title: 'title 1',
                  content: 'content1',
                });
              } else {
                return Promise.resolve(undefined);
              }
            }),
            update: jest.fn((newsId: number) => {
              if (newsId === 1) {
                return Promise.resolve({
                  id: 1,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 1,
                  associationId: 1,
                  title: 'updated title',
                  content: 'updated content',
                });
              } else {
                return Promise.resolve(undefined);
              }
            }),
            delete: jest.fn((newsId: number) => {
              if (newsId === 1) {
                return Promise.resolve({
                  id: 1,
                  createdAt: new Date('2022-09-29'),
                  updatedAt: new Date('2022-09-29'),
                  userId: 1,
                  associationId: 1,
                  title: 'title',
                  content: 'content',
                });
              } else {
                throw new PrismaClientKnownRequestError(
                  'Invalid `prisma.news.delete()` invocation:',
                  'P2025',
                  '4.0.0',
                  { cause: 'Record to delete does not exist.' }
                );
              }
            }),
          },
        },
        {
          provide: AssociationRepository,
          useValue: {
            findOne: jest.fn(() =>
              Promise.resolve({
                id: 1,
                name: 'Association 1',
                description: 'Description 1',
              })
            ),
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    repository = module.get<NewsRepository>(NewsRepository);
    associationRepository = module.get<AssociationRepository>(AssociationRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('createNews', () => {
    it('should call NewsRepository.create with correct params', async () => {
      const createNewsParams: CreateNewsDto = { associationId: 1, content: 'content', title: 'title' };
      const create = jest.spyOn(repository, 'create');

      const createResultRetrieved = await service.create(1, createNewsParams);
      expect(createResultRetrieved).toEqual({
        id: 1,
        createdAt: new Date('2022-09-29'),
        updatedAt: new Date('2022-09-29'),
        userId: 1,
        associationId: 1,
        title: 'title',
        content: 'content',
      });

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(1, createNewsParams);
    });

    it('should call NewsRepository.create and fail because the user does not exist', async () => {
      jest
        .spyOn(repository, 'create')
        .mockRejectedValue(new PrismaClientKnownRequestError('mock', 'P2003', 'mock', { field_name: 'user (index)' }));
      expect(async () => service.create(42, { associationId: 1, content: 'content', title: 'title' })).rejects.toThrow(
        'User Not Found'
      );
    });

    it('should call NewsRepository.create and fail because the association does not exist', async () => {
      jest
        .spyOn(repository, 'create')
        .mockRejectedValue(
          new PrismaClientKnownRequestError('mock', 'P2003', 'mock', { field_name: 'association (index)' })
        );
      expect(async () => service.create(1, { associationId: 42, content: 'content', title: 'title' })).rejects.toThrow(
        'Association Not Found'
      );
    });
  });

  describe('findAllAssociationNews', () => {
    it('should call NewsRepository.findAllAssociationNews and succeed', async () => {
      const findAll = jest.spyOn(repository, 'findAllAssociationNews');

      const newsRetrieved = await service.findAllAssociationNews(1);
      expect(newsRetrieved).toEqual([
        {
          id: 1,
          createdAt: new Date('2022-09-29'),
          updatedAt: new Date('2022-09-29'),
          userId: 1,
          associationId: 1,
          title: 'title 1',
          content: 'content1',
        },
        {
          id: 3,
          createdAt: new Date('2022-09-29'),
          updatedAt: new Date('2022-09-29'),
          userId: 1,
          associationId: 1,
          title: 'title 3',
          content: 'content3',
        },
      ]);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith(1);
    });

    it('should call NewsRepository.findAllAssociationNews and fail', async () => {
      jest.spyOn(associationRepository, 'findOne').mockReturnValue(Promise.resolve(undefined));
      expect(async () => await service.findAllAssociationNews(1)).rejects.toThrow('Association Not Found');
    });
  });

  describe('findAllNewsWithAssoName', () => {
    it('should call NewsRepository.findAllNewsWithAssoName and succeed', async () => {
      const findAll = jest.spyOn(repository, 'findAllNewsWithAssoName');

      const newsRetrieved = await service.findAllNewsWithAssoName();
      expect(newsRetrieved).toEqual([
        {
          id: 1,
          createdAt: new Date('2022-09-29'),
          updatedAt: new Date('2022-09-29'),
          userId: 1,
          associationId: 1,
          title: 'title 1',
          content: 'content1',
          associationName: 'association 1',
        },
        {
          id: 2,
          createdAt: new Date('2022-09-29'),
          updatedAt: new Date('2022-09-29'),
          userId: 2,
          associationId: 2,
          title: 'title 2',
          content: 'content2',
          associationName: 'association 2',
        },
        {
          id: 3,
          createdAt: new Date('2022-09-29'),
          updatedAt: new Date('2022-09-29'),
          userId: 1,
          associationId: 1,
          title: 'title 3',
          content: 'content3',
          associationName: 'association 1',
        },
      ]);

      expect(findAll).toHaveBeenCalledTimes(1);
      expect(findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should call NewsRepository.findOne', async () => {
      const findOne = jest.spyOn(repository, 'findOne');

      const newsRetrieved = await service.findOne(1);
      expect(newsRetrieved).toEqual({
        id: 1,
        createdAt: new Date('2022-09-29'),
        updatedAt: new Date('2022-09-29'),
        userId: 1,
        associationId: 1,
        title: 'title 1',
        content: 'content1',
      });

      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(1);
    });

    it('should call NewsRepository.findOne and fail because the news does not exist', async () => {
      expect(() => service.findOne(42)).rejects.toThrow(new Error('News Not Found'));
    });
  });

  describe('updateNews', () => {
    it('should call NewsRepository.update', async () => {
      const updateNewsDto: UpdateNewsDto = { content: 'content renamed', title: 'title renamed' };
      const update = jest.spyOn(repository, 'update');

      const updateResultRetrieved = await service.update(1, updateNewsDto);
      expect(updateResultRetrieved).toEqual({
        id: 1,
        createdAt: new Date('2022-09-29'),
        updatedAt: new Date('2022-09-29'),
        userId: 1,
        associationId: 1,
        title: 'updated title',
        content: 'updated content',
      });

      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, updateNewsDto);
    });

    it('should call NewsRepository.update and fail because news does not exist', async () => {
      const updateNewsDto: UpdateNewsDto = {
        content: 'content renamed',
        title: 'title renamed',
      };
      expect(() => service.update(42, updateNewsDto)).rejects.toThrow(new Error('News Not Found'));
    });
  });

  describe('deleteNews', () => {
    it('should call NewsRepository.delete', async () => {
      const deleteCall = jest.spyOn(repository, 'delete');

      const deleteResultRetrieved = await service.delete(1);
      expect(deleteResultRetrieved).toEqual({
        id: 1,
        createdAt: new Date('2022-09-29'),
        updatedAt: new Date('2022-09-29'),
        userId: 1,
        associationId: 1,
        title: 'title',
        content: 'content',
      });

      expect(deleteCall).toHaveBeenCalledTimes(1);
      expect(deleteCall).toHaveBeenCalledWith(1);
    });

    it('should call NewsRepository.delete and fail because news is not found', async () => {
      expect(() => service.delete(42)).rejects.toThrow('News To Delete Not Found');
    });
  });
});
