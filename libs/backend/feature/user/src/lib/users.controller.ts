import {
  AssociationOfUserDto,
  SimpleUserDto,
  UpdateUserDto,
  UpdateUserFirstLastNameDto,
  UserDto,
  UserIdAndEmailDto,
} from '@stud-asso/shared/dtos';
import { BadRequestException, Body, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';

import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

import { UsersService } from './users.service';

@SwaggerController('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('IdAndEmail')
  findAllIdAndEmail(): Promise<UserIdAndEmailDto[]> {
    return this.usersService.findAllIdAndEmail();
  }

  @Get('asso')
  public async findAssoOfUser(@GetCurrentUserId() userId: number): Promise<AssociationOfUserDto> {
    return this.usersService.findAssoOfUser(userId);
  }

  @Get('name/:name')
  public async findAllByName(@Param('name') name: string): Promise<UserDto[]> {
    return this.usersService.findAllByName(name);
  }

  @Get('me')
  public async getCurrentUserInfo(@GetCurrentUserId() userId: number): Promise<SimpleUserDto> {
    try {
      return await this.usersService.getCurrentUserInfo(userId);
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
