import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsFeedService } from './news-feed.service';
import { CreateNewsFeedDto } from './dto/create-news-feed.dto';
import { UpdateNewsFeedDto } from './dto/update-news-feed.dto';

@Controller('news-feed')
export class NewsFeedController {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  @Post()
  create(@Body() createNewsFeedDto: CreateNewsFeedDto) {
    return this.newsFeedService.create(createNewsFeedDto);
  }

  @Get()
  findAll() {
    return this.newsFeedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsFeedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsFeedDto: UpdateNewsFeedDto) {
    return this.newsFeedService.update(+id, updateNewsFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsFeedService.remove(+id);
  }
}
