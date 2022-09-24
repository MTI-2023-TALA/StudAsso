import { Access, GetCurrentAssoId } from '@stud-asso/backend-core-auth';
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
import { PermissionId } from '@stud-asso/shared/permission';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Access(PermissionId.EVENT_MANAGEMENT)
  @Post()
  public async create(@GetCurrentAssoId() assoId: number, @Body() createEventDto: CreateEventDto): Promise<EventDto> {
    try {
      createEventDto.date = new Date(createEventDto.date);
      return await this.eventsService.create(assoId, createEventDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Get()
  public async findAll(): Promise<EventDto[]> {
    return this.eventsService.findAll();
  }

  @Get('asso/:id')
  public async findAllByAssociationId(@Param('id') id: string): Promise<EventDto[]> {
    try {
      return await this.eventsService.findAllByAssociationId(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<EventDto> {
    try {
      return await this.eventsService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.EVENT_MANAGEMENT)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Promise<EventDto> {
    try {
      if (updateEventDto.date) updateEventDto.date = new Date(updateEventDto.date);
      return await this.eventsService.update(+id, updateEventDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Access(PermissionId.EVENT_MANAGEMENT)
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<EventDto> {
    try {
      return await this.eventsService.delete(+id);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
