import { CreateMockRepo } from '@stud-asso/backend/utils/mock';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedService } from './news-feed.service';
import { TestingModule } from '@nestjs/testing';

describe('NewsFeedService', () => {
  let service: NewsFeedService;

  const mockRepo = {
    // TODO set mock value
    find: jest.fn().mockResolvedValue(42),
  };

  beforeEach(async () => {
    const module: TestingModule = await CreateMockRepo(NewsFeedService, NewsFeed, mockRepo);

    service = module.get<NewsFeedService>(NewsFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
