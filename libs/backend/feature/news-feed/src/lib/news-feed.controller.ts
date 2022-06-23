import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNewsFeedDto, NewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';
import { NewsFeedService } from './news-feed.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';
import { UpdateResult } from 'typeorm';

@SwaggerController('news-feed')
export class NewsFeedController {
  constructor(private readonly newsFeedService: NewsFeedService) {}

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
  update(@Param('id') id: string, @Body() updateNewsFeedDto: UpdateNewsFeedDto): Promise<UpdateResult> {
    return this.newsFeedService.update(+id, updateNewsFeedDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<UpdateResult> {
    return this.newsFeedService.delete(+id);
  }
}