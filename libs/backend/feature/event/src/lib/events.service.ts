import { CreateEventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend-core-base';
import { Event } from '@stud-asso/backend/core/orm';
import { EventRepository } from '@stud-asso/backend/core/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService extends BaseService<Event, CreateEventDto, UpdateEventDto> {
  constructor(private readonly eventRepository: EventRepository) {
    super(eventRepository);
  }
}
