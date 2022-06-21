import { Association } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationRepository {
  selectAssoWithPresident = {
    id: true,
    name: true,
    description: true,
    associationsMembers: {
      select: {
        userId: true,
        user: {
          select: {
            firstname: true,
            lastname: true,
            email: true,
            isSchoolEmployee: true,
          },
        },
      },
    },
  };

  constructor(private prisma: PrismaService) {}

  public async create(createAssociation: any, currentTransaction: any = null): Promise<Association> {
    // TODO: Cannot put TransactionClient type
    // TODO: interface
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.association.create({ data: createAssociation });
  }

  public async findAll(): Promise<Association[]> {
    return this.prisma.association.findMany();
  }

  public async findOne(id: number): Promise<Association> {
    return this.prisma.association.findUnique({ where: { id } });
  }

  public async update(id: number, updateAssociation: any): Promise<Association> {
    return this.prisma.association.update({ where: { id }, data: updateAssociation });
  }

  public async delete(id: number): Promise<Association> {
    return this.prisma.association.delete({ where: { id } });
  }

  public async findAllWithPresident(): Promise<any[]> {
    return this.prisma.association.findMany({
      where: {
        deletedAt: null, // TODO: soft delete middleware (see if still necessary)
        roles: {
          some: {
            name: 'Président',
          },
        },
      },
      select: this.selectAssoWithPresident,
    });
  }

  public async findOneWithPresident(associationId: number): Promise<any> {
    return this.prisma.association.findFirst({
      where: {
        id: associationId,
        deletedAt: null, // TODO: soft delete middleware (see if still necessary)
        roles: {
          some: {
            name: 'Président',
          },
        },
      },
      select: this.selectAssoWithPresident,
    });
  }

  public async findAssociationPresident(associationId: number): Promise<any> {
    return this.prisma.association.findFirst({
      where: {
        id: associationId,
        deletedAt: null, // TODO: soft delete middleware (see if still necessary)
        roles: {
          some: {
            name: 'Président',
          },
        },
      },
      select: {
        associationsMembers: {
          select: {
            userId: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
                email: true,
                isSchoolEmployee: true,
              },
            },
          },
        },
      },
    });
  }
}
