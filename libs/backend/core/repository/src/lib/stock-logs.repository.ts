import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { StockLog } from '@prisma/client';

@Injectable()
export class StockLogsRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createStockLog: any): Promise<StockLog> {
    return this.prisma.stockLog.create({ data: createStockLog });
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
        stock: {
          select: {},
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
