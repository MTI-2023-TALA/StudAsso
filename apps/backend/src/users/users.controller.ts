import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '@stud-asso/shared/dtos';
import { UpdateResult } from 'typeorm';
import { AssociationsMembersService } from '../associations-members/associations-members.service';
import { AssociationsService } from '../associations/associations.service';
import { Association } from '../associations/entities/association.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly associationsService: AssociationsService,
    private readonly associationsMemberService: AssociationsMembersService
  ) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(+id);
  }

  @Get('/associations/:userId')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAssociationsFromUser(@Param('userId') userId: string): Promise<Association[]> {
    // TODO: verify if user exists
    const associationMembers = await this.associationsMemberService.getAssociationsFromUser(+userId);
    return this.associationsService.getAssociationsFromAssociationsMembers(associationMembers);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.usersService.remove(+id);
  }
}
