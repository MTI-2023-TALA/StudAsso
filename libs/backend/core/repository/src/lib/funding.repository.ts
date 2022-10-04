import { CreateFundingModel, FundingModel, UpdateFundingModel } from '@stud-asso/backend/core/model';

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

  findAll(associationId: number): Promise<FundingModel[]> {
    return this.prisma.funding.findMany({
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
