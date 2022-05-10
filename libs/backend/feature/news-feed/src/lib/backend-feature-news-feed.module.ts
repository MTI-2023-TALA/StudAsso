import { BackendCoreRepositoryModule } from '@stud-asso/backend/core/repository';
import { Module } from '@nestjs/common';
import { NewsFeedController } from './news-feed.controller';
import { NewsFeedService } from './news-feed.service';

@Module({
  imports: [BackendCoreRepositoryModule],
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class BackendFeatureNewsFeedModule {}
