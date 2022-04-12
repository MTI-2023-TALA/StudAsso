import { Module } from '@nestjs/common';
import { NewsFeedService } from './news-feed.service';
import { NewsFeedController } from './news-feed.controller';
import { NewsFeed } from './entities/news-feed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NewsFeed])],
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class NewsFeedModule {}
