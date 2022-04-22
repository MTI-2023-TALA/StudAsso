import { CreateNewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend-core-base';
import { Injectable } from '@nestjs/common';
import { NewsFeed } from '@stud-asso/backend/core/orm';
import { NewsFeedRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class NewsFeedService extends BaseService<NewsFeed, CreateNewsFeedDto, UpdateNewsFeedDto> {
  constructor(private readonly newsFeedRepository: NewsFeedRepository) {
    super(newsFeedRepository);
  }
}
