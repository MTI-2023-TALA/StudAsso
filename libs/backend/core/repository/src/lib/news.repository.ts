import { CreateNewsDto, UpdateNewsDto } from '@stud-asso/shared/dtos';
import { NewsModel, NewsWithAssoNameModel, QueryPaginationModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const newsSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
  associationId: true,
  title: true,
  content: true,
};

@Injectable()
export class NewsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(userId: number, associationId: number, createNews: CreateNewsDto): Promise<NewsModel> {
    return this.prisma.news.create({ data: { userId, associationId, ...createNews }, select: newsSelect });
  }

  public async findAllAssociationNews(
    associationId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<NewsModel[]> {
    return await this.prisma.news.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        associationId,
      },
      select: newsSelect,
    });
  }

  public async findAllNewsWithAssoName(queryPaginationModel: QueryPaginationModel): Promise<NewsWithAssoNameModel[]> {
    return await this.prisma.news.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        ...newsSelect,
        association: {
          select: {
            name: true,
            id: true,
          },
        },
      },
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
