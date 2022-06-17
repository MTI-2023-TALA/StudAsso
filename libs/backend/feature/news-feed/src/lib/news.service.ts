import { CreateNewsFeedDto, NewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { NewsRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  public async create(createBaseDto: CreateNewsFeedDto): Promise<any> {
    return this.newsRepository.create(createBaseDto as any);
  }

  public async findAll(): Promise<NewsFeedDto[]> {
    return this.newsRepository.findAll();
  }

  public async findOne(id: number): Promise<NewsFeedDto> {
    return this.newsRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateNewsFeedDto): Promise<any> {
    //TODO: interface
    return this.newsRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number): Promise<any> {
    // TODO: interface
    return this.newsRepository.delete(id);
  }
}
