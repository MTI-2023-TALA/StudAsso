import { CreateStockModel, QueryPaginationModel, QueryStockModel, StockModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { UpdateStockDto } from '@stud-asso/shared/dtos';

const stockSelect = { id: true, name: true, count: true, associationId: true };

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}
  public async create(createStock: CreateStockModel): Promise<StockModel> {
    return this.prisma.stock.create({ data: createStock, select: stockSelect });
  }

  public async findAll(queryStockModel: QueryStockModel): Promise<StockModel[]> {
    const query = {
      skip: queryStockModel.offset,
      take: queryStockModel.limit,
      select: stockSelect,
      orderBy: {},
    };
    query.orderBy[queryStockModel.sort] = queryStockModel.order;
    return this.prisma.stock.findMany(query);
  }

  public async findOne(id: number): Promise<StockModel> {
    return this.prisma.stock.findUnique({ where: { id }, select: stockSelect });
  }

  public async update(id: number, updateRole: UpdateStockDto): Promise<StockModel> {
    return this.prisma.stock.update({ where: { id }, data: updateRole, select: stockSelect });
  }

  public async delete(id: number): Promise<StockModel> {
    return this.prisma.stock.delete({ where: { id }, select: stockSelect });
  }

  public findAllAsso(id: number, queryPaginationModel: QueryPaginationModel): Promise<StockModel[]> {
    return this.prisma.stock.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: { associationId: id },
      select: stockSelect,
    });
  }
}
