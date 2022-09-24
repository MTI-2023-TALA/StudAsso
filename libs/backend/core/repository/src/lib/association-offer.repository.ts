import { AssociationOfferModel, CreateAssociationOfferModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationOfferRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createAssociationOffer: CreateAssociationOfferModel): Promise<AssociationOfferModel> {
    return this.prisma.associationOffer.create({ data: createAssociationOffer });
  }
}
