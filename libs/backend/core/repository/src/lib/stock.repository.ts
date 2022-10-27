import { CreateStockModel, QueryStockModel, StockModel, UpdateStockModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const stockSelect = { id: true, name: true, count: true, associationId: true };

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createStock: CreateStockModel): Promise<StockModel> {
    return this.prisma.stock.create({ data: createStock, select: stockSelect });
  }

  public findAllAsso(id: number, queryStockModel: QueryStockModel): Promise<StockModel[]> {
    const query = {
      skip: queryStockModel.offset,
      take: queryStockModel.limit,
      where: {
        associationId: id,
        name: {
          contains: queryStockModel.filter,
        },
      },
      select: stockSelect,
      orderBy: {},
    };
    query.orderBy[queryStockModel.sort] = queryStockModel.order;
    query.where['name']['mode'] = 'insensitive';
    return this.prisma.stock.findMany(query);
  }

  public async findOne(id: number): Promise<StockModel> {
    return this.prisma.stock.findUnique({ where: { id }, select: stockSelect });
  }

  public findOneAssoStockByName(name: string, associationId: number): Promise<StockModel> {
    return this.prisma.stock.findFirst({
      where: {
        associationId,
        name: {
          equals: name,
        },
      },
      select: stockSelect,
    });
  }

  public async update(id: number, updateStockPayload: UpdateStockModel): Promise<StockModel> {
    return this.prisma.stock.update({ where: { id }, data: updateStockPayload, select: stockSelect });
  }

  public async delete(id: number): Promise<StockModel> {
    return this.prisma.stock.delete({ where: { id }, select: stockSelect });
  }
}
