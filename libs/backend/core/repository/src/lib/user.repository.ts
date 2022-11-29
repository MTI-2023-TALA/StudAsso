import {
  AssociationAndRoleNameModel,
  AssociationOfUserModel,
  CreateUserModel,
  QueryPaginationModel,
  SimplifiedUserModel,
  UpdateUserModel,
  UserIdAndEmailModel,
  UserModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const simplifiedUserSelect = { id: true, firstname: true, lastname: true, email: true, isSchoolEmployee: true };
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async findAll(queryPaginationModel: QueryPaginationModel): Promise<SimplifiedUserModel[]> {
    return this.prisma.user.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      select: simplifiedUserSelect,
    });
  }

  public async findAllIdAndEmail(queryPaginationModel: QueryPaginationModel): Promise<UserIdAndEmailModel[]> {
    return this.prisma.user.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      select: {
        id: true,
        email: true,
      },
    });
  }

  public async findAssoOfUser(id: number): Promise<AssociationOfUserModel> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        associationsMembers: {
          select: {
            associationId: true,
            association: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }

  public async findCurrentUserAsso(
    userId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationAndRoleNameModel[]> {
    return this.prisma.associationMember.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: { userId },
      select: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        association: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public async findOne(id: number): Promise<UserModel> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async update(id: number, updateUserPayload: UpdateUserModel): Promise<SimplifiedUserModel> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserPayload,
      select: simplifiedUserSelect,
    });
  }

  public async delete(id: number): Promise<SimplifiedUserModel> {
    return this.prisma.user.delete({
      where: { id },
      select: simplifiedUserSelect,
    });
  }

  public createUser(createUserPayload: CreateUserModel): Promise<SimplifiedUserModel> {
    return this.prisma.user.create({
      data: createUserPayload,
      select: simplifiedUserSelect,
    });
  }

  public updateRt(userId: number, rtHash: string): Promise<UserModel> {
    return this.prisma.user.update({ where: { id: userId }, data: { rtHash } });
  }

  public findOneByEmail(email: string): Promise<UserModel> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
