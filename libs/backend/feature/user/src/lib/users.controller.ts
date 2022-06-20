import { AssoUserDto, CreateUserDto, UpdateUserDto, UserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';
import { BadRequestException, Body, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';

import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { SwaggerController } from '@stud-asso/backend/core/swagger';
import { UpdateResult } from 'typeorm';
import { UsersService } from './users.service';

@SwaggerController('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException('Email Already Used');
    }
  }

  @Get('IdAndEmail')
  findAllIdAndEmail(): Promise<UserIdAndEmailDto[]> {
    return this.usersService.findAllIdAndEmail();
  }

  @Get('asso')
  findAssoOfUser(@GetCurrentUserId() userId: number): Promise<AssoUserDto> {
    return this.usersService.findAssoOfUser(userId);
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('name/:name')
  async findAllByName(@Param('name') name: string): Promise<UserDto[]> {
    return this.usersService.findAllByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UpdateResult> {
    try {
      return await this.usersService.delete(+id);
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }
}
