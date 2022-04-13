import { CreateEventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend/utils/base';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService extends BaseService<Event, CreateEventDto, UpdateEventDto> {
  constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {
    super(eventRepository);
  }
}
