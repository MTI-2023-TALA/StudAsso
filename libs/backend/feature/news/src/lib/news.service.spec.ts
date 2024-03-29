import 'reflect-metadata';

import { AssociationDto, CreateNewsDto, NewsDto, UpdateNewsDto, UserDto } from '@stud-asso/shared/dtos';
import { AssociationRepository, NewsRepository } from '@stud-asso/backend/core/repository';
import { Test, TestingModule } from '@nestjs/testing';

import { ERROR } from '@stud-asso/backend/core/error';
import { NewsService } from './news.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('NewsService', () => {
  let service: NewsService;
  let repository: NewsRepository;

  let mockedNews: NewsDto[];
  let mockedUsers: UserDto[];
  let mockedAssociations: AssociationDto[];

  beforeEach(async () => {
    mockedNews = [
      {
        id: 1,
        createdAt: new Date('07-07-2022'),
        updatedAt: new Date('07-07-2022'),
        userId: 1,
        associationId: 1,
        title: 'title',
        content: 'content',
      },
      {
        id: 2,
        createdAt: new Date('08-07-2022'),
        updatedAt: new Date('08-07-2022'),
        userId: 2,
        associationId: 2,
        title: 'title',
        content: 'content',
      },
      {
        id: 3,
        createdAt: new Date('09-07-2022'),
        updatedAt: new Date('09-07-2022'),
        userId: 1,
        associationId: 1,
        title: 'title',
        content: 'content',
      },
    ];

    mockedUsers = [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Cena',
        email: 'john.cena@gmail.com',
        isSchoolEmployee: false,
      },
      {
        id: 2,
        firstname: 'Karim',
        lastname: 'Benzema',
        email: 'karim.benzema@gmail.com',
        isSchoolEmployee: false,
      },
    ];

    mockedAssociations = [
      {
        id: 1,
        name: 'Association 1',
        description: 'description',
      },
      {
        id: 2,
        name: 'Association 2',
        description: 'description',
      },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: NewsRepository,
          useValue: {
            create: jest.fn((userId: number, associationId: number, createNewsPayload: CreateNewsDto) => {
              if (!mockedUsers.find((user) => user.id === userId)) {
                throw new PrismaClientKnownRequestError('mock', 'P2003', 'mock', { field_name: 'user (index)' });
              }
              if (!mockedAssociations.find((association) => association.id === associationId)) {
                throw new PrismaClientKnownRequestError('mock', 'P2003', 'mock', { field_name: 'association (index)' });
              }

              const id = mockedNews.length + 1;
              const newNews = {
                id,
                createdAt: new Date(new Date().toLocaleDateString()),
                updatedAt: new Date(new Date().toLocaleDateString()),
                userId,
                associationId,
                ...createNewsPayload,
              };
              mockedNews.push(newNews);
              return Promise.resolve(newNews);
            }),
            findAllAssociationNews: jest.fn((associationId: number) => {
              return Promise.resolve(mockedNews.filter((news) => news.associationId === associationId));
            }),
            findAllNewsWithAssoName: jest.fn(() => {
              return Promise.resolve(
                mockedNews.map((news) => {
                  const association = mockedAssociations.find((association) => association.id === news.associationId);
                  return {
                    ...news,
                    association: {
                      name: association.name,
                      id: association.id,
                    },
                  };
                })
              );
            }),
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedNews.find((news) => news.id === id));
            }),
            update: jest.fn((id: number, updateNewsPayload: UpdateNewsDto) => {
              const updateNews = mockedNews.find((news) => news.id === id);
              if ('title' in updateNewsPayload) updateNews.title = updateNewsPayload.title;
              if ('content' in updateNewsPayload) updateNews.content = updateNewsPayload.content;
              return Promise.resolve(updateNews);
            }),
            delete: jest.fn((id: number) => {
              const deleteNews = mockedNews.find((news) => news.id === id);
              if (!deleteNews) {
                throw new PrismaClientKnownRequestError('Invalid `prisma.news.delete()` invocation:', 'P2025', 'mock', {
                  cause: 'Record to delete does not exist.',
                });
              }
              mockedNews = mockedNews.filter((news) => news.id !== id);
              return Promise.resolve(deleteNews);
            }),
          },
        },
        {
          provide: AssociationRepository,
          useValue: {
            findOne: jest.fn((id: number) => {
              return Promise.resolve(mockedAssociations.find((association) => association.id === id));
            }),
          },
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    repository = module.get<NewsRepository>(NewsRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create News', () => {
    it('should create a news', async () => {
      const associationId = 1;
      const createNewsPayload: CreateNewsDto = { content: 'content', title: 'title' };

      const userId = 1;

      const newNews: NewsDto = {
        id: mockedNews.length + 1,
        createdAt: new Date(new Date().toLocaleDateString()),
        updatedAt: new Date(new Date().toLocaleDateString()),
        userId,
        associationId,
        ...createNewsPayload,
      };

      expect(await service.create(userId, associationId, createNewsPayload)).toEqual(newNews);
    });

    it('should fail to create a news because the given user does not exist', async () => {
      const associationId = 1;
      const createNewsPayload: CreateNewsDto = { content: 'content', title: 'title' };

      const userId = -1;

      expect(service.create(userId, associationId, createNewsPayload)).rejects.toThrow(ERROR.USER_NOT_FOUND);
    });

    it('should fail to create a news because the given association does not exist', async () => {
      const associationId = -1;

      const createNewsPayload: CreateNewsDto = { content: 'content', title: 'title' };
      const userId = 1;

      expect(service.create(userId, associationId, createNewsPayload)).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
    });
  });

  describe('Find all news of an association', () => {
    it('should return all news of an association', async () => {
      const associationId = 1;

      expect(await service.findAllAssociationNews(associationId, {})).toEqual(
        mockedNews.filter((news) => news.associationId === associationId)
      );
    });

    it('should fail to return news of non existing association', async () => {
      const findAllAssociationNews = jest.spyOn(repository, 'findAllAssociationNews');
      const associationId = -1;

      expect(service.findAllAssociationNews(associationId, {})).rejects.toThrow(ERROR.ASSO_NOT_FOUND);
      expect(findAllAssociationNews).toHaveBeenCalledTimes(0);
    });
  });

  describe('Find all news with their association name', () => {
    it('should return all news with their association name', async () => {
      expect(await service.findAllNewsWithAssoName({})).toEqual(
        mockedNews.map((news) => {
          const association = mockedAssociations.find((association) => association.id === news.associationId);
          return {
            ...news,
            associationName: association.name,
          };
        })
      );
    });
  });

  describe('Find one news', () => {
    it('should return one news', async () => {
      const id = 1;
      expect(await service.findOne(id)).toEqual(mockedNews.find((news) => news.id === id));
    });

    it('should fail to return a news because the news id does not exist', async () => {
      const id = -1;
      expect(service.findOne(id)).rejects.toThrow(ERROR.NEWS_NOT_FOUND);
    });
  });

  describe('Update a news', () => {
    it('should update a news ', async () => {
      const newsId = 2;
      const updateNewsPayload: UpdateNewsDto = { content: 'content renamed', title: 'title renamed' };

      const updatedNews: NewsDto = {
        ...mockedNews[1],
        ...updateNewsPayload,
      };

      expect(await service.update(newsId, updateNewsPayload)).toEqual(updatedNews);
      expect(mockedNews).toContainEqual(updatedNews);
    });

    it('should fail to update news because it does not exist', async () => {
      const update = jest.spyOn(repository, 'update');
      const newsId = -1;
      const updateNewsPayload: UpdateNewsDto = { content: 'content renamed', title: 'title renamed' };

      expect(service.update(newsId, updateNewsPayload)).rejects.toThrow(ERROR.NEWS_NOT_FOUND);
      expect(update).toHaveBeenCalledTimes(0);
    });
  });

  describe('Delete a news', () => {
    it('should delete a news', async () => {
      const newsId = 1;

      const deletedNews = mockedNews.find((news) => news.id === +newsId);
      const filteredMockedNews = mockedNews.filter((news) => news.id !== +newsId);

      expect(await service.delete(newsId)).toEqual(deletedNews);
      expect(mockedNews).toEqual(filteredMockedNews);
    });

    it('should fail to delete a news because it does not exist', async () => {
      const newsId = -1;

      expect(service.delete(newsId)).rejects.toThrow(ERROR.NEWS_NOT_FOUND);
    });
  });
});
