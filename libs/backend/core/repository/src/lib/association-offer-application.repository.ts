import {
  AssociationOfferApplicationModel,
  AssociationOfferApplicationReviewModel,
  CreateAssociationOfferApplicationModel,
  QueryPaginationModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const assoOfferApplicationSelect = {
  id: true,
  associationOfferId: true,
  userId: true,
  motivation: true,
};

const assoOfferApplicationReviewSelect = {
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
};

@Injectable()
export class AssociationOfferApplicationRepository {
  constructor(private prisma: PrismaService) {}

  public async create(
    createAssociationOfferApplication: CreateAssociationOfferApplicationModel
  ): Promise<AssociationOfferApplicationModel> {
    return this.prisma.associationOfferApplication.create({
      data: createAssociationOfferApplication,
      select: assoOfferApplicationSelect,
    });
  }

  public async findAll(
    associationId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationOfferApplicationReviewModel[]> {
    return this.prisma.associationOfferApplication.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: { associationOffer: { associationId } },
      select: assoOfferApplicationReviewSelect,
    });
  }

  public async findOneAssoReview(id: number): Promise<AssociationOfferApplicationReviewModel> {
    return this.prisma.associationOfferApplication.findUnique({
      where: { id },
      select: assoOfferApplicationReviewSelect,
    });
  }

  public async findOne(id: number): Promise<AssociationOfferApplicationModel> {
    return this.prisma.associationOfferApplication.findUnique({
      where: { id },
      select: assoOfferApplicationSelect,
    });
  }

  public async delete(id: number): Promise<AssociationOfferApplicationModel> {
    return this.prisma.associationOfferApplication.delete({
      where: { id },
      select: assoOfferApplicationSelect,
    });
  }
}
