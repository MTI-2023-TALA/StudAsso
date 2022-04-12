import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@stud-asso/backend/utils/base';
import { CreateNewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';
import { Repository } from 'typeorm';
import { NewsFeed } from './entities/news-feed.entity';

@Injectable()
export class NewsFeedService extends BaseService<NewsFeed, CreateNewsFeedDto, UpdateNewsFeedDto> {
  constructor(@InjectRepository(NewsFeed) private readonly newsFeedRepository: Repository<NewsFeed>) {
    super(newsFeedRepository);
  }
}
