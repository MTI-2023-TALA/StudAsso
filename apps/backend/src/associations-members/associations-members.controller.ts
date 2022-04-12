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
import {
  AssociationsMemberDto,
  CreateAssociationsMemberDto,
  UpdateAssociationsMemberDto,
} from '@stud-asso/shared/dtos';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AssociationsMembersService } from './associations-members.service';

@Controller('associations_members')
export class AssociationsMemberController {
  constructor(private readonly associationsMemberService: AssociationsMembersService) {}

  @Post()
  public async create(
    @Body() createAssociationsMemberDto: CreateAssociationsMemberDto
  ): Promise<AssociationsMemberDto> {
    return await this.associationsMemberService.create(createAssociationsMemberDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(): Promise<AssociationsMemberDto[]> {
    return this.associationsMemberService.findAll();
  }

  @Get(':associationId/:userId')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(
    @Param('associationId') associationId: string,
    @Param('userId') userId: string
  ): Promise<AssociationsMemberDto> {
    return this.associationsMemberService.findOneAssoMember(+associationId, +userId);
  }

  @Patch(':associationId/:userId')
  update(
    @Param('associationId') associationId: string,
    @Param('userId') userId: string,
    @Body() updateAssociationsMemberDto: UpdateAssociationsMemberDto
  ): Promise<UpdateResult> {
    return this.associationsMemberService.updateAssoMember(+associationId, +userId, updateAssociationsMemberDto);
  }

  @Delete(':associationId/:userId')
  remove(@Param('associationId') associationId: string, @Param('userId') userId: string): Promise<DeleteResult> {
    return this.associationsMemberService.removeAssoMember(+associationId, +userId);
  }
}
