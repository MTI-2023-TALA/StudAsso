import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationDto, CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';
import { QueryFailedError, UpdateResult } from 'typeorm';

@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @Post()
  public async create(@Body() createAssociationDto: CreateAssociationDto): Promise<AssociationDto> {
    // TODO: add decorator to manage exceptions and return correct codes
    try {
      return await this.associationsService.create(createAssociationDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        throw new UnprocessableEntityException();
      }

      // TODO: waiting for decorator -> in case of crash to handle
      throw e;
    }
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<AssociationDto[]> {
    return this.associationsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<AssociationDto> {
    return this.associationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssociationDto: UpdateAssociationDto): Promise<UpdateResult> {
    return this.associationsService.update(+id, updateAssociationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.associationsService.remove(+id);
  }
}
