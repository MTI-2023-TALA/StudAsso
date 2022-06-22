import { Prisma, Role } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createRole: any): Promise<Role> {
    // TODO: interface
    return this.prisma.role.create({ data: createRole });
  }

  public async createRolePresident(
    associationId: number,
    currentTransaction: Prisma.TransactionClient = null
  ): Promise<Role> {
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.role.create({ data: { name: 'Président', associationId } });
  }

  public async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  public async findAllAsso(id: number): Promise<Role[]> {
    return this.prisma.role.findMany({ where: { associationId: id } });
  }

  public async findOne(id: number): Promise<Role> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  public async update(id: number, updateRole: any): Promise<Role> {
    // TODO: interface
    return this.prisma.role.update({ where: { id }, data: updateRole });
  }

  public async delete(id: number): Promise<Role> {
    return this.prisma.role.delete({ where: { id } });
  }
}
