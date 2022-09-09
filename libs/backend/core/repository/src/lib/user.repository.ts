import {
  AssociationOfUserModel,
  SimplifiedUserModel,
  UserIdAndEmailModel,
  UserModel,
} from '@stud-asso/backend/core/model';
import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

const simplifiedUserSelect = { id: true, firstname: true, lastname: true, email: true, isSchoolEmployee: true };
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<SimplifiedUserModel[]> {
    return this.prisma.user.findMany({
      select: simplifiedUserSelect,
    });
  }

  public async findAllIdAndEmail(): Promise<UserIdAndEmailModel[]> {
    return this.prisma.user.findMany({
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
              },
            },
          },
        },
      },
    });
  }

  public async findAllByName(name: string): Promise<SimplifiedUserModel[]> {
    return this.prisma.user.findMany({
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
