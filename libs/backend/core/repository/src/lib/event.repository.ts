import {
  CreateEventModel,
  EventModel,
  QueryEventModel,
  QueryPaginationModel,
  UpdateEventModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const eventSelect = {
  id: true,
  name: true,
  date: true,
  content: true,
  associationId: true,
  association: {
    select: { name: true },
  },
};

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createEvent: CreateEventModel): Promise<EventModel> {
    return this.prisma.event.create({ data: createEvent, select: eventSelect });
  }

  public async findAll(queryPaginationModel: QueryPaginationModel): Promise<EventModel[]> {
    return this.prisma.event.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      orderBy: {
        date: 'asc',
      },
      select: eventSelect,
    });
  }

  public async findAllActive(query: QueryEventModel): Promise<EventModel[]> {
    const today = new Date();
    return this.prisma.event.findMany({
      skip: query.offset,
      take: query.limit,
      orderBy: {
        date: query.isActive ? 'asc' : 'desc',
      },
      where: {
        date: query.isActive
          ? {
              gte: today,
            }
          : {
              lt: today,
            },
      },
      select: eventSelect,
    });
  }

  public async findAllByAssociationId(
    associationId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<EventModel[]> {
    return await this.prisma.event.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      orderBy: {
        date: 'desc',
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
