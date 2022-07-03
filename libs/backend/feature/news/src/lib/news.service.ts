import { CreateNewsFeedDto, NewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { NewsRepository } from '@stud-asso/backend/core/repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  public async create(createBaseDto: CreateNewsFeedDto): Promise<any> {
    try {
      return await this.newsRepository.create(createBaseDto as any);
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

  public async findAll(): Promise<NewsFeedDto[]> {
    return this.newsRepository.findAll();
  }

  public async findOne(id: number): Promise<NewsFeedDto> {
    const news = await this.newsRepository.findOne(id);
    if (!news) {
      throw new Error('News Not Found');
    }
    return news;
  }

  public async update(id: number, updateBaseDto: UpdateNewsFeedDto): Promise<any> {
    const event = await this.newsRepository.findOne(id);
    if (!event) {
      throw new Error('News Not Found');
    }

    //TODO: interface
    return this.newsRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number): Promise<any> {
    // TODO: interface
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
