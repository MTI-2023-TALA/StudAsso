import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNewsFeedDto, NewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';
import { NewsService } from './news.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('news')
export class NewsController {
  constructor(private readonly newsFeedService: NewsService) {}

  @Post()
  create(@Body() createNewsFeedDto: CreateNewsFeedDto): Promise<NewsFeedDto> {
    return this.newsFeedService.create(createNewsFeedDto);
  }

  @Get()
  findAll(): Promise<NewsFeedDto[]> {
    return this.newsFeedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<NewsFeedDto> {
    return this.newsFeedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsFeedDto: UpdateNewsFeedDto): Promise<any> {
    return this.newsFeedService.update(+id, updateNewsFeedDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.newsFeedService.delete(+id);
  }
}
