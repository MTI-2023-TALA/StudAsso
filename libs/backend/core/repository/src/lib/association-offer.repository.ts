import {
  AssociationOfferModel,
  AssociationOfferStatsModel,
  AssociationOfferWithAssoAndRoleModel,
  CreateAssociationOfferModel,
  QueryPaginationModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const assoOfferSelect = {
  id: true,
  associationId: true,
  roleId: true,
  deadline: true,
};

const fancyAssoOfferSelect = {
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
};

const offerApplicantSelect = {
  user: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  },
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
    return this.prisma.associationOffer.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      select: fancyAssoOfferSelect,
    });
  }

  public async findAllAsso(
    id: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationOfferWithAssoAndRoleModel[]> {
    return this.prisma.associationOffer.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: {
        association: {
          id,
        },
      },
      select: fancyAssoOfferSelect,
    });
  }

  public async findOfferApplicants(associationOfferId: number) {
    return this.prisma.associationOfferApplication.findMany({
      where: {
        associationOfferId,
      },
      select: offerApplicantSelect,

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  public async findStatsForOffers(
    associationId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationOfferStatsModel[]> {
    // Get all offers from association
    const allOffers = await this.prisma.associationOffer.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
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
