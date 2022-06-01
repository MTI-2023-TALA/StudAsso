import {
  AssociationDto,
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { UpdateResult } from 'typeorm';

@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @Post()
  public async create(@Body() createAssociationDto: CreateAssociationDto): Promise<AssociationDto> {
    try {
      return await this.associationsService.create(createAssociationDto);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  @Get()
  findAllWithPresident(): Promise<AssociationWithPresidentDto[]> {
    return this.associationsService.findAllWithPresident();
  }

  @Get(':id')
  public async findOneWithPresident(@Param('id') id: string): Promise<AssociationWithPresidentDto> {
    try {
      return await this.associationsService.findOneWithPresident(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto
  ): Promise<UpdateResult> {
    try {
      return await this.associationsService.update(+id, updateAssociationDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<UpdateResult> {
    return this.associationsService.delete(+id);
  }
}
