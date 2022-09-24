import {
  AssociationOfferApplicationModel,
  AssociationOfferApplicationReviewModel,
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

  public async findAll(associationId: number): Promise<AssociationOfferApplicationReviewModel[]> {
    return this.prisma.associationOfferApplication.findMany({
      where: { associationOffer: { associationId } },
      select: {
        id: true,
        createdAt: true,
        motivation: true,
        associationOffer: {
          select: {
            id: true,
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });
  }
}
