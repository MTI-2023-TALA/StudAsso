import { QueryPaginationModel, StockLogModel, StockLogWithUserModel } from '@stud-asso/backend/core/model';

import { CreateStockLogDto } from '@stud-asso/shared/dtos';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class StockLogsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createStockLog: CreateStockLogDto): Promise<StockLogModel> {
    return this.prisma.stockLog.create({ data: createStockLog });
  }

  public async findAllAssoStockLogs(
    associationId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<StockLogWithUserModel[]> {
    return this.prisma.stockLog.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: {
        stock: {
          associationId,
        },
      },
      select: {
        id: true,
        createdAt: true,
        stockId: true,
        oldCount: true,
        newCount: true,
        action: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            isSchoolEmployee: true,
          },
        },
        stock: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  public async findSpecificStockLogs(
    stockId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<StockLogModel[]> {
    return this.prisma.stockLog.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: {
        stockId,
      },
      select: {
        id: true,
        createdAt: true,
        stockId: true,
        userId: true,
        oldCount: true,
        newCount: true,
        action: true,
      },
    });
  }
}
