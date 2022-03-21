import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssociationsMembersService } from './associations-members.service';
import { CreateAssociationsMemberDto } from './dto/create-associations-member.dto';
import { UpdateAssociationsMemberDto } from './dto/update-associations-member.dto';

@Controller('associations-members')
export class AssociationsMembersController {
  constructor(private readonly associationsMembersService: AssociationsMembersService) {}

  @Post()
  create(@Body() createAssociationsMemberDto: CreateAssociationsMemberDto) {
    return this.associationsMembersService.create(createAssociationsMemberDto);
  }

  @Get()
  findAll() {
    return this.associationsMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.associationsMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssociationsMemberDto: UpdateAssociationsMemberDto) {
    return this.associationsMembersService.update(+id, updateAssociationsMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.associationsMembersService.remove(+id);
  }
}
