import {
  AssociationOfferModel,
  AssociationOfferStatsModel,
  AssociationOfferWithAssoAndRoleModel,
  CreateAssociationOfferModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationOfferRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createAssociationOffer: CreateAssociationOfferModel): Promise<AssociationOfferModel> {
    return this.prisma.associationOffer.create({ data: createAssociationOffer });
  }

  public async findAll(): Promise<AssociationOfferWithAssoAndRoleModel[]> {
    return this.prisma.associationOffer.findMany({
      select: {
        id: true,
        deadLine: true,
        association: {
          select: {
            id: true,
            name: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public async findStatsForOffers(associationId: number): Promise<AssociationOfferStatsModel[]> {
    // Get all offers from association
    const allOffers = await this.prisma.associationOffer.findMany({
      where: { associationId },
      select: {
        id: true,
        deadLine: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Groups by to count the number of applications per offer
    const groupedStats = await this.prisma.associationOfferApplication.groupBy({
      where: {
        associationOffer: {
          associationId,
        },
      },
      by: ['associationOfferId'],
      _count: {
        associationOfferId: true,
      },
    });

    // Merge the two arrays
    return allOffers.map((offer) => {
      const stats = groupedStats.find((s) => s.associationOfferId === offer.id);
      return {
        ...offer,
        numberOfApplications: stats ? stats._count.associationOfferId : 0,
      };
    });
  }

  public async findOne(id: number): Promise<AssociationOfferModel> {
    return this.prisma.associationOffer.findUnique({ where: { id } });
  }
}
