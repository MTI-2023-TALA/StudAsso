import { CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { EventRepository } from '@stud-asso/backend/core/repository';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  public async create(createBaseDto: CreateEventDto): Promise<any> {
    try {
      //TODO: transform dto to create interface
      return await this.eventRepository.create(createBaseDto as any);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta.field_name === 'association (index)') {
          throw new Error('Association Name Not Found');
        }
      }
    }
  }

  public async findAll(): Promise<EventDto[]> {
    return this.eventRepository.findAll();
  }

  public async findOne(id: number): Promise<EventDto> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new Error('Event Not Found');
    }
    return event;
  }

  public async update(id: number, updateBaseDto: UpdateEventDto): Promise<any> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new Error('Event Not Found');
    }

    //TODO: transform dto to update interface
    return await this.eventRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number): Promise<any> {
    try {
      return await this.eventRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Event To Delete Not Found');
        }
      }
    }
  }
}
