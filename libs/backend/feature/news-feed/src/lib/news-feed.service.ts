import { CreateNewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend/utils/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { NewsFeed } from '@stud-asso/backend/core/orm';
import { Repository } from 'typeorm';

@Injectable()
export class NewsFeedService extends BaseService<NewsFeed, CreateNewsFeedDto, UpdateNewsFeedDto> {
  constructor(@InjectRepository(NewsFeed) private readonly newsFeedRepository: Repository<NewsFeed>) {
    super(newsFeedRepository);
  }
}
