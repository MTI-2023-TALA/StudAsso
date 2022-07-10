import { CreateNewsDto, UpdateNewsDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { NewsModel } from '@stud-asso/backend/core/model';
import { PrismaService } from '@stud-asso/backend/core/orm';

const newsSelect = { id: true, createdAt: true, updatedAt: true, userId: true, associationId: true, content: true };

@Injectable()
export class NewsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createNews: CreateNewsDto): Promise<NewsModel> {
    return this.prisma.news.create({ data: createNews, select: newsSelect });
  }

  public async findAllAssociationNews(associationId): Promise<NewsModel[]> {
    return await this.prisma.news.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        associationId,
      },
      select: newsSelect,
    });
  }

  public async findOne(id: number): Promise<NewsModel> {
    return this.prisma.news.findUnique({ where: { id }, select: newsSelect });
  }

  public async update(id: number, updateNews: UpdateNewsDto): Promise<NewsModel> {
    return this.prisma.news.update({ where: { id }, data: updateNews, select: newsSelect });
  }

  public async delete(id: number): Promise<NewsModel> {
    return this.prisma.news.delete({ where: { id }, select: newsSelect });
  }
}