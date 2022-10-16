import { CreateStockModel, QueryPaginationModel, StockModel } from '@stud-asso/backend/core/model';
import { PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET, UpdateStockDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const stockSelect = { id: true, name: true, count: true, associationId: true };

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}
  public async create(createStock: CreateStockModel): Promise<StockModel> {
    return this.prisma.stock.create({ data: createStock, select: stockSelect });
  }

  public async findAll(queryPaginationModel: QueryPaginationModel): Promise<StockModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.stock.findMany({ skip: offset, take: limit, select: stockSelect });
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
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.stock.findMany({
      skip: offset,
      take: limit,
      where: { associationId: id },
      select: stockSelect,
    });
  }
}
