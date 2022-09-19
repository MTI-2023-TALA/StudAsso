import { CreateRoleModel, RoleModel, RolePermissionModel, UpdateRoleModel } from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const simpleUserSelect = { id: true, name: true, associationId: true, permissions: true };

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createRole: CreateRoleModel): Promise<RoleModel> {
    return this.prisma.role.create({
      data: createRole,
      select: simpleUserSelect,
    });
  }

  public async createRolePresident(associationId: number): Promise<RoleModel> {
    return this.prisma.role.create({ data: { name: 'Président', associationId }, select: simpleUserSelect });
  }

  public async findAll(id: number): Promise<RoleModel[]> {
    return this.prisma.role.findMany({ where: { associationId: id }, select: simpleUserSelect });
  }

  public async findPermissionsOfUserInAsso(userId: number, assoId: number): Promise<RolePermissionModel> {
    const res = await this.prisma.associationMember.findFirst({
      where: { associationId: assoId, userId },
      select: { role: { select: { permissions: true, name: true } } },
    });
    return res?.role;
  }

  public async findOne(id: number): Promise<RoleModel> {
    return this.prisma.role.findUnique({ where: { id }, select: simpleUserSelect });
  }

  public async update(id: number, updateRole: UpdateRoleModel): Promise<RoleModel> {
    return this.prisma.role.update({ where: { id }, data: updateRole, select: simpleUserSelect });
  }

  public async delete(id: number): Promise<RoleModel> {
    return this.prisma.role.delete({ where: { id }, select: simpleUserSelect });
  }
}
