import { AssociationRepository, NewsRepository } from '@stud-asso/backend/core/repository';
import { CreateNewsDto, NewsDto, NewsWithAssoNameDto, QueryPaginationDto, UpdateNewsDto } from '@stud-asso/shared/dtos';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly newsRepository: NewsRepository
  ) {}

  public async create(userId: number, associationId: number, createBaseDto: CreateNewsDto): Promise<NewsDto> {
    try {
      return await this.newsRepository.create(userId, associationId, createBaseDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          if (error.meta.field_name === 'user (index)') {
            throw new Error(ERROR.USER_NOT_FOUND);
          }
          if (error.meta.field_name === 'association (index)') {
            throw new Error(ERROR.ASSO_NOT_FOUND);
          }
        }
      }
    }
  }

  public async findAllAssociationNews(associationId: number, query: QueryPaginationDto): Promise<NewsDto[]> {
    const association = await this.associationRepository.findOne(associationId);
    if (!association) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }
    return await this.newsRepository.findAllAssociationNews(associationId, query);
  }

  public async findAllNewsWithAssoName(query: QueryPaginationDto): Promise<NewsWithAssoNameDto[]> {
    const newsWithAssoName = await this.newsRepository.findAllNewsWithAssoName(query);
    return newsWithAssoName.map((news) => ({
      id: news.id,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt,
      userId: news.userId,
      associationId: news.associationId,
      title: news.title,
      content: news.content,
      associationName: news.association.name,
    }));
  }

  public async findOne(id: number): Promise<NewsDto> {
    const news = await this.newsRepository.findOne(id);
    if (!news) {
      throw new Error(ERROR.NEWS_NOT_FOUND);
    }
    return news;
  }

  public async update(id: number, updateNewsDto: UpdateNewsDto): Promise<NewsDto> {
    const event = await this.newsRepository.findOne(id);
    if (!event) {
      throw new Error(ERROR.NEWS_NOT_FOUND);
    }

    return this.newsRepository.update(id, updateNewsDto);
  }

  public async delete(id: number): Promise<NewsDto> {
    try {
      return await this.newsRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error(ERROR.NEWS_NOT_FOUND);
        }
      }
    }
  }
}
