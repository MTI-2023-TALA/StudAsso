import {
  AssociationDto,
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException } from '@nestjs/common';
import { QueryFailedError, UpdateResult } from 'typeorm';
import { AssociationsService } from './associations.service';

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
  findAllWithPresident(): Promise<AssociationWithPresidentDto[]> {
    return this.associationsService.findAllWithPresident();
  }

  @Get(':id')
  findOneWithPresident(@Param('id') id: string): Promise<AssociationWithPresidentDto> {
    return this.associationsService.findOneWithPresident(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssociationDto: UpdateAssociationDto): Promise<UpdateResult> {
    return this.associationsService.update(+id, updateAssociationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<UpdateResult> {
    return this.associationsService.delete(+id);
  }
}
