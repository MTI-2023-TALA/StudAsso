import {
  AssociationOfferApplicationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  AssociationOfferStatsDto,
  AssociationOfferWithAssoAndRoleDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
  QueryPaginationDto,
  SimpleUserNoSchoolEmployeeDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationOfferApplicationRepository,
  AssociationOfferRepository,
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';
import {
  AssociationOfferApplicationReviewModel,
  AssociationOfferWithAssoAndRoleModel,
  CreateAssociationOfferApplicationModel,
  CreateAssociationOfferModel,
} from '@stud-asso/backend/core/model';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssociationOfferService {
  constructor(
    private readonly associationOfferApplicationRepository: AssociationOfferApplicationRepository,
    private readonly associationOfferRepository: AssociationOfferRepository,
    private readonly associationRepository: AssociationRepository,
    private readonly associationsMemberRepository: AssociationsMemberRepository,
    private readonly roleRepository: RoleRepository
  ) {}

  public async createAssociationOffer(
    associationId: number,
    createAssociationOfferPayload: CreateAssociationOfferDto
  ): Promise<AssociationOfferDto> {
    const role = await this.roleRepository.findOne(createAssociationOfferPayload.roleId);
    if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);
    if (role.associationId !== associationId) throw new Error(ERROR.ROLE_NOT_IN_ASSO);
    if (role.name === 'Président') throw new Error(ERROR.CANNOT_CREATE_OFFER_PRESIDENT);

    if (new Date(createAssociationOfferPayload.deadline) <= new Date()) {
      throw new Error(ERROR.BAD_DEADLINE);
    }

    const createAssoOfferModel: CreateAssociationOfferModel = {
      associationId,
      ...createAssociationOfferPayload,
    };
    return this.associationOfferRepository.create(createAssoOfferModel);
  }

  public async createAssociationOfferApplication(
    userId: number,
    createAssociationOfferApplicationPayload: CreateAssociationOfferApplicationDto
  ): Promise<AssociationOfferApplicationDto> {
    const applicationOffer = await this.associationOfferRepository.findOne(
      createAssociationOfferApplicationPayload.associationOfferId
    );
    if (!applicationOffer) throw new Error(ERROR.ASSOCIATION_OFFER_NOT_FOUND);

    const isMemberOfAsso = await this.associationsMemberRepository.isUserMemberOfAssociation({
      userId,
      assoId: applicationOffer.associationId,
    });
    if (isMemberOfAsso) throw new Error(ERROR.USER_ALREADY_MEMBER_OF_ASSO);

    const createAssoOfferApplicationModel: CreateAssociationOfferApplicationModel = {
      userId,
      ...createAssociationOfferApplicationPayload,
    };
    try {
      return await this.associationOfferApplicationRepository.create(createAssoOfferApplicationModel);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          error.code === 'P2002' &&
          error.meta.target[0] === 'user_id' &&
          error.meta.target[1] === 'association_offer_id'
        ) {
          throw new Error(ERROR.ASSOCIATION_OFFER_APPLICATION_ALREADY_EXISTS);
        }
      }
      throw error;
    }
  }

  public async findAllOffers(query: QueryPaginationDto): Promise<AssociationOfferWithAssoAndRoleDto[]> {
    const allOffers = await this.associationOfferRepository.findAll(query);
    return allOffers.map((offer) => this.formatOffer(offer));
  }

  public async findAllAssoOffers(id: number, query: QueryPaginationDto): Promise<AssociationOfferWithAssoAndRoleDto[]> {
    const association = await this.associationRepository.findOne(id);
    if (!association) throw new Error(ERROR.ASSO_NOT_FOUND);

    const assoOffers = await this.associationOfferRepository.findAllAsso(id, query);
    return assoOffers.map((offer) => this.formatOffer(offer));
  }

  public async findAllApplications(
    associationId: number,
    query: QueryPaginationDto
  ): Promise<AssociationOfferApplicationReviewDto[]> {
    const allApplications = await this.associationOfferApplicationRepository.findAll(associationId, query);
    return allApplications.map((application) => this.formatApplicationReview(application));
  }

  public async findOneApplication(id: number): Promise<AssociationOfferApplicationReviewDto> {
    const application = await this.associationOfferApplicationRepository.findOneAssoReview(id);
    if (!application) throw new Error(ERROR.ASSOCIATION_OFFER_APPLICATION_NOT_FOUND);

    return this.formatApplicationReview(application);
  }

  public async findOfferApplicants(id): Promise<SimpleUserNoSchoolEmployeeDto[]> {
    const application = await this.associationOfferApplicationRepository.findOne(id);
    if (!application) throw new Error(ERROR.ASSOCIATION_OFFER_APPLICATION_NOT_FOUND);

    return (await this.associationOfferRepository.findOfferApplicants(id)).map((application) => ({
      id: application.user.id,
      firstname: application.user.firstname,
      lastname: application.user.lastname,
      email: application.user.email,
    }));
  }

  public async findStatsForOffers(
    associationId: number,
    query: QueryPaginationDto
  ): Promise<AssociationOfferStatsDto[]> {
    const allAssoOffersWithStats = await this.associationOfferRepository.findStatsForOffers(associationId, query);
    return allAssoOffersWithStats.map((offer) => ({
      id: offer.id,
      deadline: offer.deadline,
      roleId: offer.role.id,
      roleName: offer.role.name,
      numberOfApplications: offer.numberOfApplications,
    }));
  }

  public async deleteApplication(id: number): Promise<AssociationOfferApplicationDto> {
    const application = await this.associationOfferApplicationRepository.findOne(id);
    if (!application) throw new Error(ERROR.ASSOCIATION_OFFER_APPLICATION_NOT_FOUND);

    return this.associationOfferApplicationRepository.delete(id);
  }

  private formatApplicationReview(
    assoOfferAppModel: AssociationOfferApplicationReviewModel
  ): AssociationOfferApplicationReviewDto {
    return {
      id: assoOfferAppModel.id,
      applicationDate: assoOfferAppModel.createdAt,
      motivation: assoOfferAppModel.motivation,
      associationOfferId: assoOfferAppModel.associationOffer.id,
      roleId: assoOfferAppModel.associationOffer.role.id,
      roleName: assoOfferAppModel.associationOffer.role.name,
      userId: assoOfferAppModel.user.id,
      userFullName: `${assoOfferAppModel.user.firstname} ${assoOfferAppModel.user.lastname}`,
      userEmail: assoOfferAppModel.user.email,
    };
  }

  private formatOffer(offer: AssociationOfferWithAssoAndRoleModel): AssociationOfferWithAssoAndRoleDto {
    return {
      id: offer.id,
      deadline: offer.deadline,
      associationId: offer.association.id,
      associationName: offer.association.name,
      roleId: offer.role.id,
      roleName: offer.role.name,
    };
  }
}
