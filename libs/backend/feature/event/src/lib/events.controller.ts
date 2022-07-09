import {
  BadRequestException,
  Body,
  ConflictException,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { EventsService } from './events.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  public async create(@Body() createEventDto: CreateEventDto): Promise<EventDto> {
    try {
      createEventDto.date = new Date(createEventDto.date);
      return await this.eventsService.create(createEventDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Get()
  public async findAll(): Promise<EventDto[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<EventDto> {
    try {
      return await this.eventsService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<EventDto> {
    try {
      if (updateEventDto.date) updateEventDto.date = new Date(updateEventDto.date);
      return await this.eventsService.update(+id, updateEventDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<EventDto> {
    try {
      return await this.eventsService.delete(+id);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
