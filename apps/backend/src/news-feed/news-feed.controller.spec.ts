import { Test, TestingModule } from '@nestjs/testing';
import { NewsFeedController } from './news-feed.controller';
import { NewsFeedService } from './news-feed.service';

describe('NewsFeedController', () => {
  let controller: NewsFeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsFeedController],
      providers: [NewsFeedService],
    }).compile();

    controller = module.get<NewsFeedController>(NewsFeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
