import { CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { EventRepository } from '@stud-asso/backend/core/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  public async create(createBaseDto: CreateEventDto): Promise<any> {
    //TODO: transform dto to create interface
    return this.eventRepository.create(createBaseDto as any);
  }

  public async findAll(): Promise<EventDto[]> {
    return this.eventRepository.findAll();
  }

  public async findOne(id: number): Promise<EventDto> {
    return this.eventRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateEventDto): Promise<any> {
    //TODO: transform dto to update interface
    return this.eventRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number): Promise<any> {
    return this.eventRepository.delete(id);
  }
}
