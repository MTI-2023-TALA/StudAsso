import { Prisma, StockLog } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class StockLogsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createStockLog: any, currentTransaction: Prisma.TransactionClient = null): Promise<StockLog> {
    // TODO: interface
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.stockLog.create({ data: createStockLog });
  }

  public async findAllAssoStockLogs(associationId: number): Promise<any[]> {
    // TODO: interface
    return this.prisma.stockLog.findMany({
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
      },
    });
  }

  public async findSpecificStockLogs(stockId: number): Promise<any[]> {
    // TODO: interface
    return this.prisma.stockLog.findMany({
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
