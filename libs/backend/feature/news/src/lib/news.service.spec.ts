import { AssociationDto, CreateNewsDto, NewsDto, UpdateNewsDto, UserDto } from '@stud-asso/shared/dtos';
import { AssociationRepository, NewsRepository } from '@stud-asso/backend/core/repository';
import { Test, TestingModule } from '@nestjs/testing';

import { NewsService } from './news.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

describe('NewsService', () => {
  let service: NewsService;
  let associationRepository: AssociationRepository;
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
            create: jest.fn((userId: number, createNewsPayload: CreateNewsDto) => {
              if (!mockedUsers.find((user) => user.id === userId)) {
                throw new PrismaClientKnownRequestError('mock', 'P2003', 'mock', { field_name: 'user (index)' });
              }
              if (!mockedAssociations.find((association) => association.id === createNewsPayload.associationId)) {
                throw new PrismaClientKnownRequestError('mock', 'P2003', 'mock', { field_name: 'association (index)' });
              }

              const id = mockedNews.length + 1;
              const newNews = {
                id,
                createdAt: new Date(new Date().toLocaleDateString()),
                updatedAt: new Date(new Date().toLocaleDateString()),
                userId,
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
    associationRepository = module.get<AssociationRepository>(AssociationRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create News', () => {
    it('should create a news', async () => {
      const create = jest.spyOn(repository, 'create');
      const createNewsPayload: CreateNewsDto = { associationId: 1, content: 'content', title: 'title' };

      const userId = 1;

      const newNews: NewsDto = {
        id: mockedNews.length + 1,
        createdAt: new Date(new Date().toLocaleDateString()),
        updatedAt: new Date(new Date().toLocaleDateString()),
        userId,
        ...createNewsPayload,
      };

      expect(await service.create(userId, createNewsPayload)).toEqual(newNews);
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(userId, createNewsPayload);
    });

    it('should fail to create a news because the given user does not exist', async () => {
      const create = jest.spyOn(repository, 'create');
      const createNewsPayload: CreateNewsDto = { associationId: 1, content: 'content', title: 'title' };

      const userId = -1;

      expect(() => service.create(userId, createNewsPayload)).rejects.toThrow('User Not Found');
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(userId, createNewsPayload);
    });

    it('should fail to create a news because the given association does not exist', async () => {
      const create = jest.spyOn(repository, 'create');
      const createNewsPayload: CreateNewsDto = { associationId: -1, content: 'content', title: 'title' };

      const userId = 1;

      expect(() => service.create(userId, createNewsPayload)).rejects.toThrow('Association Not Found');
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(userId, createNewsPayload);
    });
  });

  describe('Find all news of an association', () => {
    it('should return all news of an association', async () => {
      const findAllAssociationNews = jest.spyOn(repository, 'findAllAssociationNews');
      const associationId = 1;

      expect(await service.findAllAssociationNews(associationId)).toEqual(
        mockedNews.filter((news) => news.associationId === associationId)
      );
      expect(findAllAssociationNews).toHaveBeenCalledTimes(1);
      expect(findAllAssociationNews).toHaveBeenCalledWith(associationId);
    });

    it('should fail to return news of non existing association', async () => {
      const findAllAssociationNews = jest.spyOn(repository, 'findAllAssociationNews');
      const findOne = jest.spyOn(associationRepository, 'findOne');
      const associationId = -1;

      expect(async () => await service.findAllAssociationNews(associationId)).rejects.toThrow('Association Not Found');
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(associationId);
      expect(findAllAssociationNews).toHaveBeenCalledTimes(0);
    });
  });

  describe('Find all news with their association name', () => {
    it('should return all news with their association name', async () => {
      const findAllNewsWithAssoName = jest.spyOn(repository, 'findAllNewsWithAssoName');

      expect(await service.findAllNewsWithAssoName()).toEqual(
        mockedNews.map((news) => {
          const association = mockedAssociations.find((association) => association.id === news.associationId);
          return {
            ...news,
            associationName: association.name,
          };
        })
      );

      expect(findAllNewsWithAssoName).toHaveBeenCalledTimes(1);
      expect(findAllNewsWithAssoName).toHaveBeenCalledWith();
    });
  });

  describe('Find one news', () => {
    it('should return one news', async () => {
      const findOne = jest.spyOn(repository, 'findOne');
      const id = 1;

      expect(await service.findOne(id)).toEqual(mockedNews.find((news) => news.id === id));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(id);
    });

    it('should fail to return a news because the news id does not exist', async () => {
      const findOne = jest.spyOn(repository, 'findOne');
      const id = -1;

      expect(async () => await service.findOne(id)).rejects.toThrow('News Not Found');
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(id);
    });
  });

  // describe('updateNews', () => {
  //   it('should call NewsRepository.update', async () => {
  //     const updateNewsDto: UpdateNewsDto = { content: 'content renamed', title: 'title renamed' };
  //     const update = jest.spyOn(repository, 'update');

  //     const updateResultRetrieved = await service.update(1, updateNewsDto);
  //     expect(updateResultRetrieved).toEqual({
  //       id: 1,
  //       createdAt: new Date('2022-09-29'),
  //       updatedAt: new Date('2022-09-29'),
  //       userId: 1,
  //       associationId: 1,
  //       title: 'updated title',
  //       content: 'updated content',
  //     });

  //     expect(update).toHaveBeenCalledTimes(1);
  //     expect(update).toHaveBeenCalledWith(1, updateNewsDto);
  //   });

  //   it('should call NewsRepository.update and fail because news does not exist', async () => {
  //     const updateNewsDto: UpdateNewsDto = {
  //       content: 'content renamed',
  //       title: 'title renamed',
  //     };
  //     expect(() => service.update(42, updateNewsDto)).rejects.toThrow(new Error('News Not Found'));
  //   });
  // });

  // describe('deleteNews', () => {
  //   it('should call NewsRepository.delete', async () => {
  //     const deleteCall = jest.spyOn(repository, 'delete');

  //     const deleteResultRetrieved = await service.delete(1);
  //     expect(deleteResultRetrieved).toEqual({
  //       id: 1,
  //       createdAt: new Date('2022-09-29'),
  //       updatedAt: new Date('2022-09-29'),
  //       userId: 1,
  //       associationId: 1,
  //       title: 'title',
  //       content: 'content',
  //     });

  //     expect(deleteCall).toHaveBeenCalledTimes(1);
  //     expect(deleteCall).toHaveBeenCalledWith(1);
  //   });

  //   it('should call NewsRepository.delete and fail because news is not found', async () => {
  //     expect(() => service.delete(42)).rejects.toThrow('News To Delete Not Found');
  //   });
  // });
});
