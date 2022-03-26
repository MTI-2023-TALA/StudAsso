import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import {
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';

@Controller('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @Post()
  create(@Body() createAssociationDto: CreateAssociationDto) {
    return this.associationsService.create(createAssociationDto);
  }

  @Get()
  findAll() {
    return this.associationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto
  ) {
    return this.associationsService.update(+id, updateAssociationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.associationsService.remove(+id);
  }
}
