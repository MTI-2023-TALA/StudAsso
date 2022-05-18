import { AssoUserDto, CreateUserDto, UpdateUserDto, UserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { PostgresError } from 'pg-error-enum';
import { UpdateResult } from 'typeorm';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException('Email already used');
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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<UpdateResult> {
    return this.usersService.delete(+id);
  }
}
