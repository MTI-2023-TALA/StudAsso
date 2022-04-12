import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { UpdateResult } from 'typeorm';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventDto> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<EventDto[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<EventDto> {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<UpdateResult> {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.eventsService.remove(+id);
  }
}
