import { CreateEventModel, EventModel, UpdateEventModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const eventSelect = { id: true, name: true, date: true, content: true, associationId: true };

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createEvent: CreateEventModel): Promise<EventModel> {
    return this.prisma.event.create({ data: createEvent, select: eventSelect });
  }

  public async findAll(): Promise<EventModel[]> {
    return this.prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
      select: eventSelect,
    });
  }

  public async findAllByAssociationId(associationId: number): Promise<EventModel[]> {
    return await this.prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
      where: { associationId },
      select: eventSelect,
    });
  }

  public async findOne(id: number): Promise<EventModel> {
    return this.prisma.event.findUnique({ where: { id }, select: eventSelect });
  }

  public async update(id: number, updateEvent: UpdateEventModel): Promise<EventModel> {
    return this.prisma.event.update({ where: { id }, data: updateEvent, select: eventSelect });
  }

  public async delete(id: number): Promise<EventModel> {
    return this.prisma.event.delete({ where: { id }, select: eventSelect });
  }
}
