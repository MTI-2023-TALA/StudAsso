import {
  AssociationOfferModel,
  AssociationOfferStatsModel,
  AssociationOfferWithAssoAndRoleModel,
  CreateAssociationOfferModel,
  QueryPaginationModel,
} from '@stud-asso/backend/core/model';
import { PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const assoOfferSelect = {
  id: true,
  associationId: true,
  roleId: true,
  deadline: true,
};

@Injectable()
export class AssociationOfferRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createAssociationOffer: CreateAssociationOfferModel): Promise<AssociationOfferModel> {
    return this.prisma.associationOffer.create({
      data: createAssociationOffer,
      select: assoOfferSelect,
    });
  }

  public async findAll(queryPaginationModel: QueryPaginationModel): Promise<AssociationOfferWithAssoAndRoleModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.associationOffer.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        deadline: true,
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

  public async findStatsForOffers(
    associationId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationOfferStatsModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    // Get all offers from association
    const allOffers = await this.prisma.associationOffer.findMany({
      skip: offset,
      take: limit,
      where: { associationId },
      select: {
        id: true,
        deadline: true,
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
    return this.prisma.associationOffer.findUnique({
      where: { id },
      select: assoOfferSelect,
    });
  }
}
