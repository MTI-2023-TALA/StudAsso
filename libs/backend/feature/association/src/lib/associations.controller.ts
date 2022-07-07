import {
  AssociationDto,
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import {
  BadRequestException,
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('associations')
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
  public async findAllWithPresident(): Promise<AssociationWithPresidentDto[]> {
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

  @Get('president/:id')
  public async findAssociationPresident(@Param('id') id: string): Promise<UserDto> {
    try {
      return await this.associationsService.findAssociationPresident(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto
  ): Promise<AssociationDto> {
    try {
      return await this.associationsService.update(+id, updateAssociationDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<AssociationDto> {
    try {
      return await this.associationsService.delete(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
