import { Access, GetCurrentAssoId, GetCurrentUserId } from '@stud-asso/backend-core-auth';
import {
  AssociationOfferApplicationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  AssociationOfferStatsDto,
  AssociationOfferWithAssoAndRoleDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
  QueryPaginationDto,
} from '@stud-asso/shared/dtos';
import { Body, ConflictException, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { AssociationOfferService } from './association-offer.service';
import { PermissionId } from '@stud-asso/shared/permission';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('association_offers')
export class AssociationOfferController {
  constructor(private associationOfferService: AssociationOfferService) {}

  @Access(PermissionId.OFFERS_MANAGEMENT)
  @Post()
  public async createAssociationOffer(
    @GetCurrentAssoId() assoId: number,
    @Body() createAssociationOfferPayload: CreateAssociationOfferDto
  ): Promise<AssociationOfferDto> {
    try {
      return await this.associationOfferService.createAssociationOffer(assoId, createAssociationOfferPayload);
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Post('/application')
  public async createAssociationOfferApplication(
    @GetCurrentUserId() userId: number,
    @Body() createAssociationOfferApplicationPayload: CreateAssociationOfferApplicationDto
  ): Promise<AssociationOfferApplicationDto> {
    try {
      return await this.associationOfferService.createAssociationOfferApplication(
        userId,
        createAssociationOfferApplicationPayload
      );
    } catch (error) {
      throw new ConflictException(error?.message);
    }
  }

  @Get()
  public async findAllOffers(@Query() query: QueryPaginationDto): Promise<AssociationOfferWithAssoAndRoleDto[]> {
    return this.associationOfferService.findAllOffers(query);
  }

  @Get('offers/current_asso')
  public async findCurrentAssoOffers(
    @GetCurrentAssoId() assoId: number,
    @Query() query: QueryPaginationDto
  ): Promise<AssociationOfferWithAssoAndRoleDto[]> {
    try {
      return await this.associationOfferService.findAllAssoOffers(assoId, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('offers/:id')
  public async findAllAssoOffers(
    @Param('id') id: string,
    @Query() query: QueryPaginationDto
  ): Promise<AssociationOfferWithAssoAndRoleDto[]> {
    try {
      return await this.associationOfferService.findAllAssoOffers(+id, query);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('/application')
  public async findAllApplications(
    @GetCurrentAssoId() assoId: number,
    @Query() query: QueryPaginationDto
  ): Promise<AssociationOfferApplicationReviewDto[]> {
    return this.associationOfferService.findAllApplications(assoId, query);
  }

  @Get('/application/:id')
  public async findOneApplication(@Param('id') id: string): Promise<AssociationOfferApplicationReviewDto> {
    try {
      return await this.associationOfferService.findOneApplication(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }

  @Get('/stats')
  public async findStatsForOffers(
    @GetCurrentAssoId() assoId: number,
    @Query() query: QueryPaginationDto
  ): Promise<AssociationOfferStatsDto[]> {
    return this.associationOfferService.findStatsForOffers(assoId, query);
  }

  @Access(PermissionId.OFFERS_MANAGEMENT)
  @Delete('/application/:id')
  public async deleteApplication(@Param('id') id: string): Promise<AssociationOfferApplicationDto> {
    try {
      return await this.associationOfferService.deleteApplication(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
