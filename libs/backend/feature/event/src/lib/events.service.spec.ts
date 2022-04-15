import { CreateMockRepo } from '@stud-asso/backend/utils/mock';
import { Event } from '@stud-asso/backend/core/orm';
import { EventsService } from './events.service';
import { TestingModule } from '@nestjs/testing';

describe('EventsService', () => {
  let service: EventsService;

  const mockRepo = {
    // TODO set mock value
    find: jest.fn().mockResolvedValue(42),
  };

  beforeEach(async () => {
    const module: TestingModule = await CreateMockRepo(EventsService, Event, mockRepo);

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
