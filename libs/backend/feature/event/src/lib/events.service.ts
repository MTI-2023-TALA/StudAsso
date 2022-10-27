import * as _ from 'lodash';

import { AssociationRepository, EventRepository } from '@stud-asso/backend/core/repository';
import { CreateEventDto, EventDto, QueryEventDto, QueryPaginationDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { ERROR } from '@stud-asso/backend/core/error';
import { EventModel } from '@stud-asso/backend/core/model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly eventRepository: EventRepository
  ) {}

  public async create(associationId: number, createEventDto: CreateEventDto): Promise<EventDto> {
    try {
      return this.mapEventModelToEventDto(await this.eventRepository.create({ ...createEventDto, associationId }));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003' && error.meta.field_name === 'association (index)') {
          throw new Error(ERROR.ASSO_NOT_FOUND);
        }
      }
    }
  }

  public async findAll(query: QueryPaginationDto): Promise<EventDto[]> {
    return (await this.eventRepository.findAll(query)).map(this.mapEventModelToEventDto);
  }

  public async findAllActive(query: QueryEventDto): Promise<EventDto[]> {
    return (await this.eventRepository.findAllActive(query)).map(this.mapEventModelToEventDto);
  }

  public async findAllByAssociationId(associationId: number, query: QueryPaginationDto): Promise<EventDto[]> {
    const asso = await this.associationRepository.findOne(associationId);
    if (!asso) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }
    return (await this.eventRepository.findAllByAssociationId(associationId, query)).map(this.mapEventModelToEventDto);
  }

  public async findOne(id: number): Promise<EventDto> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new Error(ERROR.EVENT_NOT_FOUND);
    }
    return this.mapEventModelToEventDto(event);
  }

  public async update(id: number, updateEventDto: UpdateEventDto): Promise<EventDto> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new Error(ERROR.EVENT_NOT_FOUND);
    }

    return this.mapEventModelToEventDto(await this.eventRepository.update(id, updateEventDto));
  }

  public async delete(id: number): Promise<EventDto> {
    try {
      return this.mapEventModelToEventDto(await this.eventRepository.delete(id));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error(ERROR.EVENT_NOT_FOUND);
        }
      }
    }
  }

  private mapEventModelToEventDto(event: EventModel): EventDto {
    return { ..._.omit(event, ['association']), associationName: event.association.name };
  }
}
