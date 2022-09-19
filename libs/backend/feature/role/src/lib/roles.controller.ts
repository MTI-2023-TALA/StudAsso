import { AddRoleToUserDto, AssociationsMemberDto, CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
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
import { Access } from '@stud-asso/backend-core-auth';
import { PermissionId } from '@stud-asso/shared/permission';
import { RolesService } from './roles.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Access(PermissionId.ROLE_MANAGEMENT)
  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    try {
      return await this.rolesService.create(createRoleDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Access(PermissionId.MEMBER_ADD)
  @Post('/user')
  public async addRoleToUser(@Body() addRoleToUser: AddRoleToUserDto): Promise<AssociationsMemberDto> {
    try {
      return await this.rolesService.addRoleToUser(addRoleToUser);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('/asso/:id')
  public findAll(@Param('id') id: string): Promise<RoleDto[]> {
    return this.rolesService.findAll(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleDto> {
    try {
      return await this.rolesService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Access(PermissionId.ROLE_MANAGEMENT)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    try {
      return await this.rolesService.update(+id, updateRoleDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Access(PermissionId.ROLE_MANAGEMENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<RoleDto> {
    try {
      return await this.rolesService.delete(+id);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
