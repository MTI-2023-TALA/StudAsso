import { BackendCoreOrmModule } from '@stud-asso/backend/core/orm';
import { Module } from '@nestjs/common';
import { NewsFeedController } from './news-feed.controller';
import { NewsFeedService } from './news-feed.service';

@Module({
  imports: [BackendCoreOrmModule],
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class NewsFeedModule {}
