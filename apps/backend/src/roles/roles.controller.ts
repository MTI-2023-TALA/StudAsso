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
import { CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import { QueryFailedError, UpdateResult } from 'typeorm';

import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    // TODO: add decorator to manage exceptions and return correct codes
    try {
      return await this.rolesService.create(createRoleDto);
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
  findAll(): Promise<RoleDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoleDto> {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<UpdateResult> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.rolesService.remove(+id);
  }
}
