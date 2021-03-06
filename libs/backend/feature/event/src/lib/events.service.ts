import { AssociationRepository, EventRepository } from '@stud-asso/backend/core/repository';
import { CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly eventRepository: EventRepository
  ) {}

  public async create(createEventDto: CreateEventDto): Promise<EventDto> {
    try {
      return await this.eventRepository.create(createEventDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta.field_name === 'association (index)') {
          throw new Error('Association Not Found');
        }
      }
    }
  }

  public async findAll(): Promise<EventDto[]> {
    return this.eventRepository.findAll();
  }

  public async findAllByAssociationId(associationId: number): Promise<EventDto[]> {
    const asso = await this.associationRepository.findOne(associationId);
    if (!asso) {
      throw new Error('Association Not Found');
    }
    return await this.eventRepository.findAllByAssociationId(associationId);
  }

  public async findOne(id: number): Promise<EventDto> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new Error('Event Not Found');
    }
    return event;
  }

  public async update(id: number, updateEventDto: UpdateEventDto): Promise<EventDto> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new Error('Event Not Found');
    }

    return this.eventRepository.update(id, updateEventDto);
  }

  public async delete(id: number): Promise<EventDto> {
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
