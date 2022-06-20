import { AddRoleToUserDto, AssociationsMemberDto, CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
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
import { RolesService } from './roles.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';
import { UpdateResult } from 'typeorm';

@SwaggerController('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    try {
      return await this.rolesService.create(createRoleDto);
    } catch (error) {
      throw new UnprocessableEntityException('Name Already Exists');
    }
  }

  @Post('/user')
  public async addRoleToUser(@Body() addRoleToUser: AddRoleToUserDto): Promise<AssociationsMemberDto> {
    try {
      return await this.rolesService.addRoleToUser(addRoleToUser);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('/asso/:id')
  findAll(@Param('id') id: string): Promise<RoleDto[]> {
    return this.rolesService.findAll(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleDto> {
    try {
      return await this.rolesService.findOne(+id);
    } catch (error) {
      throw new NotFoundException('Role Not Found');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<UpdateResult> {
    try {
      return await this.rolesService.update(+id, updateRoleDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UpdateResult> {
    try {
      return await this.rolesService.delete(+id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
