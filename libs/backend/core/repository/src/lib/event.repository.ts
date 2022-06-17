import { Event } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createEvent: Event): Promise<Event> {
    return this.prisma.event.create({ data: createEvent });
  }

  public async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  public async findOne(id: number): Promise<Event> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  public async update(id: number, updateEvent: Event): Promise<Event> {
    return this.prisma.event.update({ where: { id }, data: updateEvent });
  }

  public async delete(id: number): Promise<Event> {
    return this.prisma.event.delete({ where: { id } });
  }
}
