import { CreateNewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';

import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NewsFeed } from '@stud-asso/backend/core/orm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsFeedRepository extends BaseRepository<NewsFeed, CreateNewsFeedDto, UpdateNewsFeedDto> {
  constructor(@InjectRepository(NewsFeed) private readonly newsFeedRepository: Repository<NewsFeed>) {
    super(newsFeedRepository);
  }
}
