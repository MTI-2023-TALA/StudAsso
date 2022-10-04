import { Access, GetCurrentAssoId, GetCurrentUserId, IsSchoolEmployee } from '@stud-asso/backend-core-auth';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateFundingDto,
  FundingDto,
  OptionStatFundingDto,
  StatFundingDto,
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

  @Get()
  findAll(@GetCurrentAssoId() assoId: number): Promise<FundingDto[]> {
    return this.backendFeatureFundingService.findAll(assoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.backendFeatureFundingService.findOne(+id);
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
  update(@Param('id') id: string, @Body() updateFundingDto: UpdateFundingDto) {
    return this.backendFeatureFundingService.update(+id, updateFundingDto);
  }
}
