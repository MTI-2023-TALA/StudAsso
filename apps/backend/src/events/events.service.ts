import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@stud-asso/backend/utils/base';
import { CreateEventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService extends BaseService<Event, CreateEventDto, UpdateEventDto> {
  constructor(@InjectRepository(Event) private readonly eventRepository: Repository<Event>) {
    super(eventRepository);
  }
}
