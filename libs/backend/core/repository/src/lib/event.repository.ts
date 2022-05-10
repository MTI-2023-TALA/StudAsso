import { CreateEventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { BaseRepository } from './base.repository';
import { Event } from '@stud-asso/backend/core/orm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class EventRepository extends BaseRepository<Event, CreateEventDto, UpdateEventDto> {
  constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {
    super(eventRepository);
  }
}
