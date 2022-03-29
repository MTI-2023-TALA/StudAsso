import { Controller, Get, Post, Body, Patch, Param, Delete, UnprocessableEntityException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import { QueryFailedError } from 'typeorm';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto) {
    // TODO: add decorator to manage exceptions and return correct codes
    try {
      return await this.rolesService.create(createRoleDto);
    }

    catch (e) {
      if (e instanceof QueryFailedError)
      {
        throw new UnprocessableEntityException();
      }

      // TODO: waiting for decorator -> in case of crash to handle
      throw e;
    }
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
