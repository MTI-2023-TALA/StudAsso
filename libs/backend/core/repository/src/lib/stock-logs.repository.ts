import { CreateStockLogDto, PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';
import { QueryPaginationModel, StockLogModel, StockLogWithUserModel } from '@stud-asso/backend/core/model';

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
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.stockLog.findMany({
      skip: offset,
      take: limit,
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
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.stockLog.findMany({
      skip: offset,
      take: limit,
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
