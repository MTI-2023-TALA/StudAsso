import { Module } from '@nestjs/common';
import { NewsFeed } from './entities/news-feed.entity';
import { NewsFeedController } from './news-feed.controller';
import { NewsFeedService } from './news-feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NewsFeed])],
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class NewsFeedModule {}
