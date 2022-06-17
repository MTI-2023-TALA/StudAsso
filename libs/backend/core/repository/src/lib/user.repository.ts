import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { User } from '@prisma/client';
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public async update(id: number, updateUser: User): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: updateUser });
  }

  public async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  public createUser(
    email: string,
    firstname: string,
    lastname: string,
    isSchoolEmployee: boolean,
    passwordHash: string
  ): Promise<User> {
    return this.prisma.user.create({ data: { email, firstname, lastname, isSchoolEmployee, passwordHash } });
  }

  public updateRt(userId: number, rtHash: string): Promise<User> {
    return this.prisma.user.update({ where: { id: userId }, data: { rtHash } });
  }

  public findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  public async findAllIdAndEmail(): Promise<any> {
    //TODO: create interface
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });
  }

  public async findAssoOfUser(id: number): Promise<any> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        associationsMembers: true,
      },
    });
  }

  public async findAllByName(name: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        lastname: { contains: name },
        firstname: { contains: name },
      },
    });
  }
}
