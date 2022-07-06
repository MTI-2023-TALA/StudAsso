import { Body, Delete, Get, NotFoundException, Param, Patch, Post, UnprocessableEntityException } from '@nestjs/common';
import { CreateNewsDto, NewsDto, UpdateNewsDto } from '@stud-asso/shared/dtos';
import { NewsService } from './news.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('news')
export class NewsController {
  constructor(private readonly newsFeedService: NewsService) {}

  @Post()
  public async create(@Body() createNewsFeedDto: CreateNewsDto): Promise<NewsDto> {
    try {
      return await this.newsFeedService.create(createNewsFeedDto);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  @Get()
  public async findAll(): Promise<NewsDto[]> {
    return this.newsFeedService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<NewsDto> {
    try {
      return await this.newsFeedService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateNewsFeedDto: UpdateNewsDto): Promise<NewsDto> {
    try {
      return await this.newsFeedService.update(+id, updateNewsFeedDto);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<NewsDto> {
    try {
      return await this.newsFeedService.delete(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
