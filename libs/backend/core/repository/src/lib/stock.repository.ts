import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { Stock } from '@prisma/client';

@Injectable()
export class StockRepository {
  constructor(private prisma: PrismaService) {}
  public async create(createStock: any, currentTransaction: any = null): Promise<Stock> {
    // TODO: Cannot put TransactionClient type
    // TODO: interface
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.stock.create({ data: createStock });
  }

  public async findAll(): Promise<Stock[]> {
    return this.prisma.stock.findMany();
  }

  public findAllAsso(id: number): Promise<Stock[]> {
    return this.prisma.stock.findMany({ where: { associationId: id } });
  }

  public async findOne(id: number): Promise<Stock> {
    return this.prisma.stock.findUnique({ where: { id } });
  }

  public async update(id: number, updateRole: any, currentTransaction: any = null): Promise<Stock> {
    // TODO: Cannot put TransactionClient type
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.update({ where: { id }, data: updateRole });
  }

  public async delete(id: number, currentTransaction: any = null): Promise<Stock> {
    // TODO: Cannot put TransactionClient type
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.stock.delete({ where: { id } });
  }
}
