import { Injectable } from '@nestjs/common';
import { CreateNewsFeedDto } from './dto/create-news-feed.dto';
import { UpdateNewsFeedDto } from './dto/update-news-feed.dto';

@Injectable()
export class NewsFeedService {
  create(createNewsFeedDto: CreateNewsFeedDto) {
    return 'This action adds a new newsFeed';
  }

  findAll() {
    return `This action returns all newsFeed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} newsFeed`;
  }

  update(id: number, updateNewsFeedDto: UpdateNewsFeedDto) {
    return `This action updates a #${id} newsFeed`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsFeed`;
  }
}
