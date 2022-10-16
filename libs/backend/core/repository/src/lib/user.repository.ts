import {
  AssociationAndRoleNameModel,
  AssociationOfUserModel,
  QueryPaginationModel,
  SimplifiedUserModel,
  UserIdAndEmailModel,
  UserModel,
} from '@stud-asso/backend/core/model';
import { CreateUserDto, PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET, UpdateUserDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const simplifiedUserSelect = { id: true, firstname: true, lastname: true, email: true, isSchoolEmployee: true };
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async findAll(queryPaginationModel: QueryPaginationModel): Promise<SimplifiedUserModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.user.findMany({
      skip: offset,
      take: limit,
      select: simplifiedUserSelect,
    });
  }

  public async findAllIdAndEmail(queryPaginationModel: QueryPaginationModel): Promise<UserIdAndEmailModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.user.findMany({
      skip: offset,
      take: limit,
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

  public async findAllByName(name: string, queryPaginationModel: QueryPaginationModel): Promise<SimplifiedUserModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.user.findMany({
      skip: offset,
      take: limit,
      where: {
        OR: [{ firstname: { contains: name } }, { lastname: { contains: name } }],
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        isSchoolEmployee: true,
      },
    });
  }

  public async findCurrentUserAsso(
    userId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationAndRoleNameModel[]> {
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.associationMember.findMany({
      skip: offset,
      take: limit,
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

  public async update(id: number, updateUser: UpdateUserDto): Promise<SimplifiedUserModel> {
    return this.prisma.user.update({
      where: { id },
      data: updateUser,
      select: simplifiedUserSelect,
    });
  }

  public async delete(id: number): Promise<SimplifiedUserModel> {
    return this.prisma.user.delete({
      where: { id },
      select: simplifiedUserSelect,
    });
  }

  public createUser(createUserDto: CreateUserDto): Promise<SimplifiedUserModel> {
    return this.prisma.user.create({
      data: createUserDto,
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
