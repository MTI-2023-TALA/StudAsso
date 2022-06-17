import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';
import { EventsService } from './events.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventDto> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<EventDto[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventDto> {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<any> {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.eventsService.delete(+id);
  }
}
