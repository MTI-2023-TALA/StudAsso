import {
  AssociationDto,
  AssociationMemberWithRoleDto,
  AssociationWithPresidentDto,
  AssociationsMemberDto,
  CreateAssociationDto,
  QueryAssociationMembersDto,
  QueryPaginationDto,
  UpdateAssociationDto,
  UserDto,
} from '@stud-asso/shared/dtos';
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
  Query,
} from '@nestjs/common';
import { GetCurrentAssoId, IsSchoolEmployee } from '@stud-asso/backend-core-auth';
import { AssociationsService } from './associations.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @IsSchoolEmployee()
  @Post()
  public async create(@Body() createAssociationDto: CreateAssociationDto): Promise<AssociationDto> {
    try {
      return await this.associationsService.create(createAssociationDto);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Get('members')
  public async findAssociationMembersWithRoles(
    @GetCurrentAssoId() id: number,
    @Query() query: QueryAssociationMembersDto
  ): Promise<AssociationMemberWithRoleDto[]> {
    try {
      return await this.associationsService.findAssociationMembersWithRoles(id, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get()
  public async findAllWithPresident(@Query() query: QueryPaginationDto): Promise<AssociationWithPresidentDto[]> {
    return this.associationsService.findAllWithPresident(query);
  }

  @Get('current')
  public async findCurrentAssociationWithPresident(
    @GetCurrentAssoId() assoId: number
  ): Promise<AssociationWithPresidentDto> {
    try {
      return await this.associationsService.findOneWithPresident(assoId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get(':id')
  public async findOneWithPresident(@Param('id') id: string): Promise<AssociationWithPresidentDto> {
    try {
      return await this.associationsService.findOneWithPresident(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('president/:id')
  public async findAssociationPresident(@Param('id') id: string): Promise<UserDto> {
    try {
      return await this.associationsService.findAssociationPresident(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateAssociationDto: UpdateAssociationDto
  ): Promise<AssociationDto> {
    try {
      return await this.associationsService.update(+id, updateAssociationDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Delete('member/:userId')
  public async deleteUserFromAsso(
    @Param('userId') userId: string,
    @GetCurrentAssoId() assoId: number
  ): Promise<AssociationsMemberDto> {
    try {
      return await this.associationsService.deleteUserFromAsso(+userId, assoId);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<AssociationDto> {
    try {
      return await this.associationsService.delete(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
