import { TestingModule } from '@nestjs/testing';
import { CreateMockService } from '@stud-asso/backend/utils/mock';
import { NewsFeedController } from './news-feed.controller';
import { NewsFeedService } from './news-feed.service';

describe('NewsFeedController', () => {
  let controller: NewsFeedController;

  beforeEach(async () => {
    const module: TestingModule = await CreateMockService([NewsFeedController], {
      type: NewsFeedService,
      // TODO: set mock value
      methods: { findAll: jest.fn().mockResolvedValue([42]) },
    });

    controller = module.get<NewsFeedController>(NewsFeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
