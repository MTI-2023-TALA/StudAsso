import {
  CreateFundingModel,
  FundingModel,
  QueryPaginationModel,
  UpdateFundingModel,
} from '@stud-asso/backend/core/model';
import { PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const selectFundingModel = {
  id: true,
  createdAt: true,
  name: true,
  amount: true,
  motivation: true,
  status: true,
  schoolComment: true,
  association: {
    select: {
      name: true,
    },
  },
};

@Injectable()
export class FundingRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(associationId: number, userId: number, createFundingModel: CreateFundingModel): Promise<FundingModel> {
    const mydata = {
      ...createFundingModel,
      associationId,
      userId,
    };
    return this.prisma.funding.create({
      data: mydata,
      select: selectFundingModel,
    });
  }

  findAll(associationId: number, queryPaginationModel: QueryPaginationModel): Promise<FundingModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.funding.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        associationId,
      },
      select: selectFundingModel,
    });
  }

  findOne(id: number): Promise<FundingModel> {
    return this.prisma.funding.findUnique({
      where: {
        id,
      },
      select: selectFundingModel,
    });
  }

  update(id: number, updateFundingModel: UpdateFundingModel): Promise<FundingModel> {
    return this.prisma.funding.update({ where: { id }, data: updateFundingModel, select: selectFundingModel });
  }

  getSumInInterval(
    associationId: number,
    { startDate, endDate }: { startDate: Date; endDate: Date }
  ): Promise<{ _sum: { amount: number } }> {
    return this.prisma.funding.aggregate({
      where: {
        associationId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: {
        amount: true,
      },
    });
  }

  getNbAccepted(associationId: number): Promise<number> {
    return this.prisma.funding.count({
      where: {
        associationId,
        status: 'ACCEPTED',
      },
    });
  }

  getNbRejected(associationId: number): Promise<number> {
    return this.prisma.funding.count({
      where: {
        associationId,
        status: 'REJECTED',
      },
    });
  }
}
