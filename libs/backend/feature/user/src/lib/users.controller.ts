import {
  AssociationAndRoleNameDto,
  AssociationOfUserDto,
  QueryPaginationDto,
  SimpleUserDto,
  UpdateUserDto,
  UpdateUserFirstLastNameDto,
  UserDto,
  UserIdAndEmailDto,
} from '@stud-asso/shared/dtos';
import { BadRequestException, Body, Delete, Get, NotFoundException, Param, Patch, Query } from '@nestjs/common';

import { GetCurrentUserId, IsSchoolEmployee } from '@stud-asso/backend-core-auth';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

import { UsersService } from './users.service';

@SwaggerController('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsSchoolEmployee()
  @Get()
  public async findAll(@Query() query: QueryPaginationDto): Promise<UserDto[]> {
    return this.usersService.findAll(query);
  }

  @Get('IdAndEmail')
  findAllIdAndEmail(@Query() query: QueryPaginationDto): Promise<UserIdAndEmailDto[]> {
    return this.usersService.findAllIdAndEmail(query);
  }

  @Get('asso')
  public async findAssoOfUser(@GetCurrentUserId() userId: number): Promise<AssociationOfUserDto> {
    return this.usersService.findAssoOfUser(userId);
  }

  @Get('me')
  public async findCurrentUserInfo(@GetCurrentUserId() userId: number): Promise<SimpleUserDto> {
    try {
      return await this.usersService.findCurrentUserInfo(userId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('me/asso')
  public async findCurrentUserAsso(
    @GetCurrentUserId() userId: number,
    @Query() query: QueryPaginationDto
  ): Promise<AssociationAndRoleNameDto[]> {
    try {
      return await this.usersService.findCurrentUserAsso(userId, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<UserDto> {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Patch('me')
  public async updateCurrentUserInfo(
    @GetCurrentUserId() userId: number,
    @Body() updateUserDto: UpdateUserFirstLastNameDto
  ): Promise<SimpleUserDto> {
    try {
      return await this.usersService.updateCurrentUserInfo(userId, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<UserDto> {
    try {
      return await this.usersService.delete(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
