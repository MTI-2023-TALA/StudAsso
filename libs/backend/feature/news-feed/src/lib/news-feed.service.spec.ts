import { Test, TestingModule } from '@nestjs/testing';

import { NewsFeedRepository } from '@stud-asso/backend/core/repository';
import { NewsFeedService } from './news-feed.service';

describe('NewsFeedService', () => {
  let service: NewsFeedService;
  let newsFeedRepository: NewsFeedRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsFeedService,
        {
          provide: NewsFeedRepository,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<NewsFeedService>(NewsFeedService);
    newsFeedRepository = module.get<NewsFeedRepository>(NewsFeedRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('associationRepository should be defined', () => {
    expect(newsFeedRepository).toBeDefined();
  });
});
