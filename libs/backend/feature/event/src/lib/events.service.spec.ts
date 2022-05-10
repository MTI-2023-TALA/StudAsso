import { Test, TestingModule } from '@nestjs/testing';

import { EventRepository } from '@stud-asso/backend/core/repository';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let eventsRepository: EventRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: EventRepository,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    eventsRepository = module.get<EventRepository>(EventRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('associationRepository should be defined', () => {
    expect(eventsRepository).toBeDefined();
  });
});
