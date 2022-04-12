import { Test, TestingModule } from '@nestjs/testing';
import { NewsFeedService } from './news-feed.service';

describe('NewsFeedService', () => {
  let service: NewsFeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsFeedService],
    }).compile();

    service = module.get<NewsFeedService>(NewsFeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
