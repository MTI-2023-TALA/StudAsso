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
}
