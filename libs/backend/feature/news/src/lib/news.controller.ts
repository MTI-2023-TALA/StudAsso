import { Body, ConflictException, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateNewsDto, NewsDto, NewsWithAssoNameDto, UpdateNewsDto } from '@stud-asso/shared/dtos';
import { NewsService } from './news.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('news')
export class NewsController {
  constructor(private readonly newsFeedService: NewsService) {}

  @Post()
  public async create(@Body() createNewsDto: CreateNewsDto): Promise<NewsDto> {
    try {
      return await this.newsFeedService.create(createNewsDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Get('asso/:id')
  public async findAllAssociationNews(@Param('id') id: string): Promise<NewsDto[]> {
    try {
      return await this.newsFeedService.findAllAssociationNews(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('assoWithAssoName')
  public async findAllNewsWithAssoName(): Promise<NewsWithAssoNameDto[]> {
    return await this.newsFeedService.findAllNewsWithAssoName();
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
  public async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto): Promise<NewsDto> {
    try {
      return await this.newsFeedService.update(+id, updateNewsDto);
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
