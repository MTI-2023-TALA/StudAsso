import { CreateNewsFeedDto, NewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { NewsFeedRepository } from '@stud-asso/backend/core/repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class NewsFeedService {
  constructor(private readonly newsFeedRepository: NewsFeedRepository) {}

  public async create(createBaseDto: CreateNewsFeedDto): Promise<any> {
    return this.newsFeedRepository.create(createBaseDto as any);
  }

  public async findAll(): Promise<NewsFeedDto[]> {
    return this.newsFeedRepository.findAll();
  }

  public async findOne(id: number): Promise<NewsFeedDto> {
    return this.newsFeedRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateNewsFeedDto): Promise<UpdateResult> {
    return this.newsFeedRepository.update(id, updateBaseDto as any);
  }

  public async remove(id: number): Promise<UpdateResult> {
    return this.newsFeedRepository.remove(id);
  }
}
