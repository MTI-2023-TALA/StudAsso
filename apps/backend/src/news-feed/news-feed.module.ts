import { Module } from '@nestjs/common';
import { NewsFeedService } from './news-feed.service';
import { NewsFeedController } from './news-feed.controller';

@Module({
  controllers: [NewsFeedController],
  providers: [NewsFeedService]
})
export class NewsFeedModule {}
