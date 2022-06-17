import { Injectable } from '@nestjs/common';
import { News } from '@prisma/client';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class NewsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createNews: any): Promise<News> {
    // TODO: interface
    return this.prisma.news.create({ data: createNews });
  }

  public async findAll(): Promise<News[]> {
    return this.prisma.news.findMany();
  }

  public async findOne(id: number): Promise<News> {
    return this.prisma.news.findUnique({ where: { id } });
  }

  public async update(id: number, updateNews: any): Promise<News> {
    return this.prisma.news.update({ where: { id }, data: updateNews });
  }

  public async delete(id: number): Promise<News> {
    return this.prisma.news.delete({ where: { id } });
  }
}
