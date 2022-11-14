import { Access, GetCurrentAssoId, GetCurrentUserId, IsSchoolEmployee } from '@stud-asso/backend-core-auth';
import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import {
  CreateFundingDto,
  FundingDto,
  OptionStatFundingDto,
  QueryFundingStatusDto,
  QueryPaginationDto,
  StatFundingDto,
  SumFundingStatusDto,
  UpdateFundingDto,
} from '@stud-asso/shared/dtos';
import { FundingService } from './funding.service';
import { PermissionId } from '@stud-asso/shared/permission';

@Controller('funding')
export class FundingController {
  constructor(private backendFeatureFundingService: FundingService) {}

  @Access(PermissionId.FUNDING_MANAGEMENT)
  @Post()
  create(
    @GetCurrentAssoId() assoId: number,
    @GetCurrentUserId() userId: number,
    @Body() createFundingDto: CreateFundingDto
  ): Promise<FundingDto> {
    return this.backendFeatureFundingService.create(assoId, userId, createFundingDto);
  }

  @IsSchoolEmployee()
  @Get()
  findAll(@Query() query: QueryPaginationDto): Promise<FundingDto[]> {
    return this.backendFeatureFundingService.findAll(undefined, query);
  }

  @Get('/me')
  findAllByCurrentAsso(@GetCurrentAssoId() assoId: number, @Query() query: QueryPaginationDto): Promise<FundingDto[]> {
    return this.backendFeatureFundingService.findAll(assoId, query);
  }

  @Get('count')
  getSumOfOfferSpecificStatus(@Query() query: QueryFundingStatusDto): Promise<SumFundingStatusDto> {
    return this.backendFeatureFundingService.getSumOfOfferSpecificStatus(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FundingDto> {
    try {
      return await this.backendFeatureFundingService.findOne(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Put('stats')
  getStats(
    @GetCurrentAssoId() assoId: number,
    @Body() optionStatFundingDto: OptionStatFundingDto
  ): Promise<StatFundingDto> {
    return this.backendFeatureFundingService.getStats(assoId, optionStatFundingDto);
  }

  @IsSchoolEmployee()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFundingDto: UpdateFundingDto): Promise<FundingDto> {
    return this.backendFeatureFundingService.update(+id, updateFundingDto);
  }
}
