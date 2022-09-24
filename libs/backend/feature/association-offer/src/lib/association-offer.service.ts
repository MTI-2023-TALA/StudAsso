import {
  AssociationOfferApplicationRepository,
  AssociationOfferRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';
import { AssociationOfferDto, CreateAssociationOfferDto } from '@stud-asso/shared/dtos';

import { CreateAssociationOfferModel } from '@stud-asso/backend/core/model';
import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociationOfferService {
  constructor(
    private readonly associationOfferRepository: AssociationOfferRepository,
    private readonly associationOfferApplicationRepository: AssociationOfferApplicationRepository,
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
}
