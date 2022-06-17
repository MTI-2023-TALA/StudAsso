import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { Stock } from '@prisma/client';

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}
  public async create(createStock: any): Promise<Stock> {
    // TODO: interface
    return this.prisma.stock.create({ data: createStock });
  }

  public async findAll(): Promise<Stock[]> {
    return this.prisma.stock.findMany();
  }

  public async findOne(id: number): Promise<Stock> {
    return this.prisma.stock.findUnique({ where: { id } });
  }

  public async update(id: number, updateRole: any): Promise<Stock> {
    return this.prisma.stock.update({ where: { id }, data: updateRole });
  }

  public async delete(id: number): Promise<Stock> {
    return this.prisma.stock.delete({ where: { id } });
  }

  public findAllAsso(id: number): Promise<Stock[]> {
    return this.prisma.stock.findMany({ where: { associationId: id } });
  }
}
