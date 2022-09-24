import {
  AssociationOfferApplicationModel,
  CreateAssociationOfferApplicationModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationOfferApplicationRepository {
  constructor(private prisma: PrismaService) {}

  public async create(
    createAssociationOfferApplication: CreateAssociationOfferApplicationModel
  ): Promise<AssociationOfferApplicationModel> {
    return this.prisma.associationOfferApplication.create({ data: createAssociationOfferApplication });
  }
}
