import {
  AssociationOfferApplicationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  AssociationOfferWithAssoAndRoleDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationOfferApplicationRepository,
  AssociationOfferRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';
import { CreateAssociationOfferApplicationModel, CreateAssociationOfferModel } from '@stud-asso/backend/core/model';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociationOfferService {
  constructor(
    private readonly associationOfferApplicationRepository: AssociationOfferApplicationRepository,
    private readonly associationOfferRepository: AssociationOfferRepository,
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

    if (new Date(createAssociationOfferPayload.deadLine) <= new Date()) {
      throw new Error(ERROR.BAD_DEAD_LINE);
    }

    const createAssoOfferPayload: CreateAssociationOfferModel = {
      associationId,
      ...createAssociationOfferPayload,
    };
    return this.associationOfferRepository.create(createAssoOfferPayload);
  }

  public async createAssociationOfferApplication(
    userId: number,
    createAssociationOfferApplicationPayload: CreateAssociationOfferApplicationDto
  ): Promise<AssociationOfferApplicationDto> {
    const applicationOffer = await this.associationOfferRepository.findOne(
      createAssociationOfferApplicationPayload.associationOfferId
    );
    if (!applicationOffer) throw new Error(ERROR.ASSOCIATION_OFFER_NOT_FOUND);

    const isMemberOfAsso = await this.associationsMemberRepository.isUserMemberOfAssociation(
      userId,
      applicationOffer.associationId
    );
    if (isMemberOfAsso) throw new Error(ERROR.USER_ALREADY_MEMBER_OF_ASSO);

    const createApplicationPayload: CreateAssociationOfferApplicationModel = {
      userId,
      ...createAssociationOfferApplicationPayload,
    };
    return this.associationOfferApplicationRepository.create(createApplicationPayload);
  }

  public async findAllOffers(): Promise<AssociationOfferWithAssoAndRoleDto[]> {
    const allOffers = await this.associationOfferRepository.findAll();
    return allOffers.map((offer) => ({
      id: offer.id,
      deadLine: offer.deadLine,
      associationId: offer.association.id,
      associationName: offer.association.name,
      roleId: offer.role.id,
      roleName: offer.role.name,
    }));
  }

  public async findAllApplications(associationId: number): Promise<AssociationOfferApplicationReviewDto[]> {
    const allApplications = await this.associationOfferApplicationRepository.findAll(associationId);
    return allApplications.map((application) => ({
      id: application.id,
      applicationDate: application.createdAt,
      motivation: application.motivation,
      associationOfferId: application.associationOffer.id,
      roleId: application.associationOffer.role.id,
      roleName: application.associationOffer.role.name,
      userId: application.user.id,
      userFirstname: application.user.firstname,
      userLastname: application.user.lastname,
      userEmail: application.user.email,
    }));
  }

  public async deleteApplication(id: number): Promise<AssociationOfferApplicationDto> {
    const application = await this.associationOfferApplicationRepository.findOne(id);
    if (!application) throw new Error(ERROR.ASSOCIATION_OFFER_APPLICATION_NOT_FOUND);

    return this.associationOfferApplicationRepository.delete(id);
  }
}
