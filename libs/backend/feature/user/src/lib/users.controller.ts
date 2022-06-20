import { AssoUserDto, UpdateUserDto, UserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';
import { BadRequestException, Body, Delete, Get, NotFoundException, Param, Patch } from '@nestjs/common';

import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

import { UsersService } from './users.service';

@SwaggerController('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('IdAndEmail')
  findAllIdAndEmail(): Promise<UserIdAndEmailDto[]> {
    return this.usersService.findAllIdAndEmail();
  }

  @Get('asso')
  findAssoOfUser(@GetCurrentUserId() userId: number): Promise<AssoUserDto> {
    //TODO: handle error if no asso for user
    return this.usersService.findAssoOfUser(userId);
  }

  @Get('name/:name')
  async findAllByName(@Param('name') name: string): Promise<UserDto[]> {
    return this.usersService.findAllByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    try {
      return await this.usersService.delete(+id);
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }
}
