import {
  AssociationModel,
  AssociationPresidentModel,
  AssociationWithPresidentModel,
  CreateAssociationModel,
  QueryPaginationModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { UpdateAssociationDto } from '@stud-asso/shared/dtos';

const assoSelect = { id: true, name: true, description: true };

const assoWithPresidentSelect = {
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

@Injectable()
export class AssociationRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createAssociation: CreateAssociationModel): Promise<AssociationModel> {
    return this.prisma.association.create({ data: createAssociation, select: assoSelect });
  }

  public async findAll(): Promise<AssociationModel[]> {
    return this.prisma.association.findMany({ select: assoSelect });
  }

  public async findOne(id: number): Promise<AssociationModel> {
    return this.prisma.association.findUnique({ where: { id }, select: assoSelect });
  }

  public async update(id: number, updateAssociation: UpdateAssociationDto): Promise<AssociationModel> {
    return this.prisma.association.update({ where: { id }, data: updateAssociation, select: assoSelect });
  }

  public async delete(id: number): Promise<AssociationModel> {
    return this.prisma.association.delete({ where: { id }, select: assoSelect });
  }

  public async findAllWithPresident(
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationWithPresidentModel[]> {
    return this.prisma.association.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: {
        roles: {
          some: {
            name: 'Président',
          },
        },
      },
      select: assoWithPresidentSelect,
    });
  }

  public async findOneWithPresident(associationId: number): Promise<AssociationWithPresidentModel> {
    return this.prisma.association.findFirst({
      where: {
        id: associationId,
        roles: {
          some: {
            name: 'Président',
          },
        },
      },
      select: assoWithPresidentSelect,
    });
  }

  public async findAssociationPresident(associationId: number): Promise<AssociationPresidentModel> {
    return this.prisma.association.findFirst({
      where: {
        id: associationId,
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

  public async findAssoPresident(associationId: number) {
    return this.prisma.associationMember.findFirst({
      where: {
        associationId: associationId,
        role: {
          name: 'Président',
        },
      },
      select: {
        userId: true,
        associationId: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });
  }

  public async getCreationDate(associationId: number): Promise<Date> {
    const creationDate = await this.prisma.association.findFirst({
      where: {
        id: associationId,
      },
      select: {
        createdAt: true,
      },
    });
    return creationDate.createdAt;
  }
}
