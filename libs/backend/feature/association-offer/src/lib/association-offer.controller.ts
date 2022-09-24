import { Access, GetCurrentAssoId, GetCurrentUserId } from '@stud-asso/backend-core-auth';
import {
  AssociationOfferApplicationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  AssociationOfferStatsDto,
  AssociationOfferWithAssoAndRoleDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
} from '@stud-asso/shared/dtos';
import { Body, ConflictException, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { AssociationOfferService } from './association-offer.service';
import { PermissionId } from '@stud-asso/shared/permission';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('association_offers')
export class AssociationOfferController {
  constructor(private associationOfferService: AssociationOfferService) {}

  @Access(PermissionId.MEMBER_ADD)
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
  public async findAllOffers(): Promise<AssociationOfferWithAssoAndRoleDto[]> {
    return this.associationOfferService.findAllOffers();
  }

  @Access(PermissionId.MEMBER_ADD)
  @Get('/application')
  public async findAllApplications(
    @GetCurrentAssoId() assoId: number
  ): Promise<AssociationOfferApplicationReviewDto[]> {
    return this.associationOfferService.findAllApplications(assoId);
  }

  @Get('/stats')
  public async findStatsForOffers(@GetCurrentAssoId() assoId: number): Promise<AssociationOfferStatsDto[]> {
    return this.associationOfferService.findStatsForOffers(assoId);
  }

  @Access(PermissionId.MEMBER_REMOVE)
  @Delete('/application/:id')
  public async deleteApplication(@Param('id') id: string): Promise<AssociationOfferApplicationDto> {
    try {
      return await this.associationOfferService.deleteApplication(+id);
    } catch (error) {
      throw new NotFoundException(error?.message);
    }
  }
}
