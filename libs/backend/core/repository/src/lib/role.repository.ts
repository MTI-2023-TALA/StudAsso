import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { Role } from '@prisma/client';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createRole: any): Promise<Role> {
    // TODO: interface
    return this.prisma.role.create({ data: createRole });
  }

  public async findAll(): Promise<Role[]> {
    return this.prisma.role.findMany();
  }

  public async findOne(id: number): Promise<Role> {
    return this.prisma.role.findUnique({ where: { id } });
  }

  public async update(id: number, updateRole: any): Promise<Role> {
    return this.prisma.role.update({ where: { id }, data: updateRole });
  }

  public async delete(id: number): Promise<Role> {
    return this.prisma.role.delete({ where: { id } });
  }

  public async createRolePresident(associationId: number, currentTransaction: any = null): Promise<Role> {
    // TODO: Cannot put TransactionClient type
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.role.create({ data: { name: 'Président', associationId } });
  }

  public async findAllAsso(id: number): Promise<Role[]> {
    return this.prisma.role.findMany({ where: { associationId: id } });
  }
}
