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
import { GetCurrentAssoId, GetCurrentUserId } from '@stud-asso/backend-core-auth';
import { AssociationOfferService } from './association-offer.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('association_offers')
export class AssociationOfferController {
  constructor(private associationOfferService: AssociationOfferService) {}

  // put acl
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

  // put acl
  @Get('/application')
  public async findAllApplications(
    @GetCurrentAssoId() assoId: number,
    @Query() query: QueryPaginationDto
  ): Promise<AssociationOfferApplicationReviewDto[]> {
    return this.associationOfferService.findAllApplications(assoId, query);
  }

  // put acl
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

  // put acl
  @Delete('/application/:id')
  public async deleteApplication(@Param('id') id: string): Promise<AssociationOfferApplicationDto> {
    try {
      return await this.associationOfferService.deleteApplication(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
