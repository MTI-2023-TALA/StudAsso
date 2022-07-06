import { CreateEventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { EventModel } from '@stud-asso/backend/core/model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const eventSelect = { id: true, name: true, date: true, content: true, associationId: true };

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createEvent: CreateEventDto): Promise<EventModel> {
    return this.prisma.event.create({ data: createEvent, select: eventSelect });
  }

  public async findAll(): Promise<EventModel[]> {
    return this.prisma.event.findMany({ select: eventSelect });
  }

  public async findOne(id: number): Promise<EventModel> {
    return this.prisma.event.findUnique({ where: { id }, select: eventSelect });
  }

  public async update(id: number, updateEvent: UpdateEventDto): Promise<EventModel> {
    return this.prisma.event.update({ where: { id }, data: updateEvent, select: eventSelect });
  }

  public async delete(id: number): Promise<EventModel> {
    return this.prisma.event.delete({ where: { id }, select: eventSelect });
  }
}
