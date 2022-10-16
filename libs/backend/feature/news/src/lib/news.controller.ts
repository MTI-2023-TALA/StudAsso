import { Access, GetCurrentAssoId, GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { Body, ConflictException, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateNewsDto, NewsDto, NewsWithAssoNameDto, QueryPaginationDto, UpdateNewsDto } from '@stud-asso/shared/dtos';

import { NewsService } from './news.service';
import { PermissionId } from '@stud-asso/shared/permission';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('news')
export class NewsController {
  constructor(private readonly newsFeedService: NewsService) {}

  @Access(PermissionId.NEWS_MANAGEMENT)
  @Post()
  public async create(
    @GetCurrentUserId() userId: number,
    @GetCurrentAssoId() assoId: number,
    @Body() createNewsDto: CreateNewsDto
  ): Promise<NewsDto> {
    try {
      return await this.newsFeedService.create(userId, assoId, createNewsDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Get('asso')
  public async findAllAssociationNews(
    @GetCurrentAssoId() id: number,
    @Query() query: QueryPaginationDto
  ): Promise<NewsDto[]> {
    try {
      return await this.newsFeedService.findAllAssociationNews(id, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('assoWithAssoName')
  public async findAllNewsWithAssoName(@Query() query: QueryPaginationDto): Promise<NewsWithAssoNameDto[]> {
    return await this.newsFeedService.findAllNewsWithAssoName(query);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<NewsDto> {
    try {
      return await this.newsFeedService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.NEWS_MANAGEMENT)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto): Promise<NewsDto> {
    try {
      return await this.newsFeedService.update(+id, updateNewsDto);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.NEWS_MANAGEMENT)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<NewsDto> {
    try {
      return await this.newsFeedService.delete(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
