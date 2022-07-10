import { AssociationRepository, NewsRepository } from '@stud-asso/backend/core/repository';
import { CreateNewsDto, NewsDto, NewsWithAssoNameDto, UpdateNewsDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly newsRepository: NewsRepository
  ) {}

  public async create(createBaseDto: CreateNewsDto): Promise<NewsDto> {
    try {
      return await this.newsRepository.create(createBaseDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          if (error.meta.field_name === 'user (index)') {
            throw new Error('User Not Found');
          }
          if (error.meta.field_name === 'association (index)') {
            throw new Error('Association Not Found');
          }
        }
      }
    }
  }

  public async findAllAssociationNews(associationId: number): Promise<NewsDto[]> {
    const association = await this.associationRepository.findOne(associationId);
    if (!association) {
      throw new Error('Association Not Found');
    }
    return await this.newsRepository.findAllAssociationNews(associationId);
  }

  public async findAllNewsWithAssoName(): Promise<NewsWithAssoNameDto[]> {
    const newsWithAssoName = await this.newsRepository.findAllNewsWithAssoName();
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
      throw new Error('News Not Found');
    }
    return news;
  }

  public async update(id: number, updateNewsDto: UpdateNewsDto): Promise<NewsDto> {
    const event = await this.newsRepository.findOne(id);
    if (!event) {
      throw new Error('News Not Found');
    }

    return this.newsRepository.update(id, updateNewsDto);
  }

  public async delete(id: number): Promise<NewsDto> {
    try {
      return await this.newsRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Event To Delete Not Found');
        }
      }
    }
  }
}
