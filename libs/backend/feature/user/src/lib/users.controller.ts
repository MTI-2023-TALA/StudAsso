import { AssoUserDto, CreateUserDto, UpdateUserDto, UserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { UpdateResult } from 'typeorm';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get('IdAndEmail')
  findAllIdAndEmail(): Promise<UserIdAndEmailDto[]> {
    return this.usersService.findAllIdAndEmail();
  }

  @Get('asso')
  findAssoOfUser(@GetCurrentUserId() userId: number): Promise<AssoUserDto> {
    console.log(userId);
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
