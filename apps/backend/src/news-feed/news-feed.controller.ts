import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNewsFeedDto, NewsFeedDto, UpdateNewsFeedDto } from '@stud-asso/shared/dtos';

import { NewsFeedService } from './news-feed.service';
import { UpdateResult } from 'typeorm';

@Controller('news-feed')
export class NewsFeedController {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  @Post()
  create(@Body() createNewsFeedDto: CreateNewsFeedDto): Promise<NewsFeedDto> {
    return this.newsFeedService.create(createNewsFeedDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<NewsFeedDto[]> {
    return this.newsFeedService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<NewsFeedDto> {
    return this.newsFeedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsFeedDto: UpdateNewsFeedDto): Promise<UpdateResult> {
    return this.newsFeedService.update(+id, updateNewsFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.newsFeedService.remove(+id);
  }
}
