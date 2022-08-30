import { AssociationDto, CreateNewsDto, NewsDto, UpdateNewsDto, UserDto } from '@stud-asso/shared/dtos';
import { Test, TestingModule } from '@nestjs/testing';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsService;

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
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: {
            create: jest.fn((userId: number, createNewsPayload: CreateNewsDto) => {
              if (!mockedUsers.find((user) => user.id === userId)) {
                throw new Error('User Not Found');
              }
              if (!mockedAssociations.find((association) => association.id === createNewsPayload.associationId)) {
                throw new Error('Association Not Found');
              }

              const id = mockedNews.length + 1;
              const newNews: NewsDto = {
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
              if (!mockedAssociations.find((association) => association.id === associationId)) {
                throw new Error('Association Not Found');
              }
              return Promise.resolve(mockedNews.filter((news) => news.associationId === associationId));
            }),
            findAllNewsWithAssoName: jest.fn(() => {
              return Promise.resolve(
                mockedNews.map((news) => {
                  const association = mockedAssociations.find((association) => association.id === news.associationId);
                  return {
                    ...news,
                    associationName: association.name,
                  };
                })
              );
            }),
            findOne: jest.fn((newsId: number) => {
              const findNews = mockedNews.find((news) => news.id === newsId);
              if (!findNews) throw new Error('News Not Found');
              return Promise.resolve(findNews);
            }),
            update: jest.fn((id: number, updateNewsPayload: UpdateNewsDto) => {
              const updateNews = mockedNews.find((news) => news.id === id);
              if (!updateNews) throw new Error('News Not Found');
              if ('title' in updateNewsPayload) updateNews.title = updateNewsPayload.title;
              if ('content' in updateNewsPayload) updateNews.content = updateNewsPayload.content;
              return Promise.resolve(updateNews);
            }),
            delete: jest.fn((id: number) => {
              const deleteNews = mockedNews.find((news) => news.id === id);
              if (!deleteNews) throw new Error('News To Delete Not Found');
              mockedNews.splice(mockedNews.indexOf(deleteNews), 1);
              return Promise.resolve(deleteNews);
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    service = await module.get<NewsService>(NewsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('Create News', () => {
    it('should create a new news', async () => {
      const create = jest.spyOn(service, 'create');
      const createNewsPayload: CreateNewsDto = {
        associationId: 1,
        title: 'title',
        content: 'content',
      };

      const userId = 1;

      const newNews: NewsDto = {
        id: mockedNews.length + 1,
        createdAt: new Date(new Date().toLocaleDateString()),
        updatedAt: new Date(new Date().toLocaleDateString()),
        userId,
        ...createNewsPayload,
      };

      expect(await controller.create(userId, createNewsPayload)).toEqual(newNews);
      expect(mockedNews).toContainEqual(newNews);

      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(userId, createNewsPayload);
    });

    it('should fail because an error has been raised', async () => {
      const create = jest.spyOn(service, 'create');
      const createNewsPayload: CreateNewsDto = {
        associationId: 1,
        title: 'title',
        content: 'content',
      };

      const userId = -1;

      expect(() => controller.create(userId, createNewsPayload)).rejects.toThrow(new Error('User Not Found'));
      expect(create).toHaveBeenCalledTimes(1);
      expect(create).toHaveBeenCalledWith(userId, createNewsPayload);
    });
  });

  describe('Find all news of an association', () => {
    it('should find all news of an association', async () => {
      const findAllAssociationNews = jest.spyOn(service, 'findAllAssociationNews');
      const associationId = '1';

      expect(await controller.findAllAssociationNews(associationId)).toEqual(
        mockedNews.filter((news) => news.associationId === +associationId)
      );
      expect(findAllAssociationNews).toHaveBeenCalledTimes(1);
      expect(findAllAssociationNews).toHaveBeenCalledWith(+associationId);
    });

    it('should fail because an error has been raised', async () => {
      const findAllAssociationNews = jest.spyOn(service, 'findAllAssociationNews');
      const associationId = '-1';

      expect(() => controller.findAllAssociationNews(associationId)).rejects.toThrow(
        new Error('Association Not Found')
      );
      expect(findAllAssociationNews).toHaveBeenCalledTimes(1);
      expect(findAllAssociationNews).toHaveBeenCalledWith(+associationId);
    });
  });

  describe('Find all news with association name', () => {
    it('should find all news with association name specified', async () => {
      const findAllNewsWithAssoName = jest.spyOn(service, 'findAllNewsWithAssoName');

      expect(await controller.findAllNewsWithAssoName()).toEqual(
        mockedNews.map((news) => {
          const association = mockedAssociations.find((association) => association.id === news.associationId);
          return {
            ...news,
            associationName: association.name,
          };
        })
      );
      expect(findAllNewsWithAssoName).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find one news', () => {
    it('should find one news', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      const newsId = '1';

      expect(await controller.findOne(newsId)).toEqual(mockedNews.find((news) => news.id === +newsId));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+newsId);
    });

    it('should fail because an error has been raised', () => {
      const findOne = jest.spyOn(service, 'findOne');
      const newsId = '-1';

      expect(() => controller.findOne(newsId)).rejects.toThrow(new Error('News Not Found'));
      expect(findOne).toHaveBeenCalledTimes(1);
      expect(findOne).toHaveBeenCalledWith(+newsId);
    });
  });

  describe('Update news', () => {
    it('should update a news', async () => {
      const update = jest.spyOn(service, 'update');
      const newsId = '2';
      const updateNewsPayload: UpdateNewsDto = {
        title: 'title updated',
        content: 'content updated',
      };

      const updatedNews: NewsDto = {
        ...mockedNews[1],
        ...updateNewsPayload,
      };

      expect(await controller.update(newsId, updateNewsPayload)).toEqual(updatedNews);
      expect(mockedNews).toContainEqual(updatedNews);
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+newsId, updateNewsPayload);
    });

    it('should fail to update because an error occured', async () => {
      const update = jest.spyOn(service, 'update');
      const newsId = '-1';
      const updateNewsPayload: UpdateNewsDto = {
        title: 'title updated',
        content: 'content updated',
      };

      expect(() => controller.update(newsId, updateNewsPayload)).rejects.toThrow(new Error('News Not Found'));
      expect(update).toHaveBeenCalledTimes(1);
      expect(update).toHaveBeenCalledWith(+newsId, updateNewsPayload);
    });
  });

  describe('Delete news', () => {
    it('should delete a news', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const newsId = '2';

      const deletedNews = mockedNews.find((news) => news.id === +newsId);
      const filteredMockedNews = mockedNews.filter((news) => news.id !== +newsId);

      expect(await controller.delete(newsId)).toEqual(deletedNews);
      expect(mockedNews).toEqual(filteredMockedNews);
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+newsId);
    });

    it('should fail to delete a news because an error occured', async () => {
      const deleteOne = jest.spyOn(service, 'delete');
      const newsId = '-1';

      expect(() => controller.delete(newsId)).rejects.toThrow(new Error('News To Delete Not Found'));
      expect(deleteOne).toHaveBeenCalledTimes(1);
      expect(deleteOne).toHaveBeenCalledWith(+newsId);
    });
  });
});
