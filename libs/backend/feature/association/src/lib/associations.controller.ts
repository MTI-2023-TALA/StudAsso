import 'multer';
import { Access, GetCurrentAssoId, IsPresident, IsSchoolEmployee, Public } from '@stud-asso/backend-core-auth';
import {
  AssociationDto,
  AssociationMemberWithRoleDto,
  AssociationWithPresidentDto,
  AssociationsMemberDto,
  ChangePresidentDto,
  CreateAssociationDto,
  QueryAssociationMembersDto,
  QueryPaginationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import {
  BadRequestException,
  Body,
  ConflictException,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Response,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { FILE_SIZE } from '@stud-asso/backend/core/file-helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { PermissionId } from '@stud-asso/shared/permission';
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

  @Access(PermissionId.ASSO_MANAGEMENT)
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  public async addImageToAssociation(
    @GetCurrentAssoId() assoId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: FILE_SIZE.THREE_MB }),
          new FileTypeValidator({ fileType: 'image' }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<void> {
    try {
      return await this.associationsService.addImageToAssociation(assoId, file);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @IsPresident()
  @Post('president/change')
  public async changeAssociationPresident(
    @GetCurrentAssoId() assoId: number,
    @Body() changePresidentDto: ChangePresidentDto
  ): Promise<AssociationsMemberDto> {
    try {
      return await this.associationsService.changeAssociationPresident(assoId, changePresidentDto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Get('image/:id')
  @Public()
  public async getImageFromAssociation(
    @Response({ passthrough: true }) res: Response,
    @Param('id') id: string
  ): Promise<StreamableFile> {
    try {
      return await this.associationsService.getImageFromAssociation(res, +id);
    } catch (error) {
      throw new NotFoundException(error?.message);
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
