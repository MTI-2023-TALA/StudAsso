import { CreateFundingModel, FundingModel, UpdateFundingModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const selectFundingModel = {
  id: true,
  createdAt: true,
  amount: true,
  motivation: true,
  status: true,
  schoolComment: true,
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
    console.log(mydata);
    return this.prisma.funding.create({
      data: mydata,
      select: selectFundingModel,
    });
  }

  findAll(associationId: number) {
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

  update(id: number, updateFundingModel: UpdateFundingModel): Promise<FundingModel> {
    return this.prisma.funding.update({ where: { id }, data: updateFundingModel, select: selectFundingModel });
  }

  getSumInInterval(associationId: number, { startDate, endDate }: { startDate: Date; endDate: Date }) {
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

  getNbAccepted(associationId: number) {
    return this.prisma.funding.count({
      where: {
        associationId,
        status: 'ACCEPTED',
      },
    });
  }

  getNbRejected(associationId: number) {
    return this.prisma.funding.count({
      where: {
        associationId,
        status: 'REJECTED',
      },
    });
  }
}
