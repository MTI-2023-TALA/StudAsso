import {
  AddRoleToUserModel,
  AssociationMemberWithRoleWithoutIdsModel,
  QueryPaginationModel,
} from '@stud-asso/backend/core/model';

import { AssociationMember } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationsMemberRepository {
  constructor(private prisma: PrismaService) {}

  public async linkUserToRole(addRoleToUserDto: AddRoleToUserModel): Promise<AssociationMember> {
    return this.prisma.associationMember.create({ data: addRoleToUserDto });
  }

  public findAssociationMembersWithRoles(
    associationId: number,
    queryPaginationModel: QueryPaginationModel
  ): Promise<AssociationMemberWithRoleWithoutIdsModel[]> {
    return this.prisma.associationMember.findMany({
      skip: queryPaginationModel.offset,
      take: queryPaginationModel.limit,
      where: { associationId },
      select: {
        user: {
          select: {
            firstname: true,
            lastname: true,
          },
        },
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public async isUserMemberOfAssociation(userId: number, associationId: number): Promise<boolean> {
    const isMemberOfAsso = await this.prisma.associationMember.findFirst({
      where: { userId, associationId },
    });
    return isMemberOfAsso ? true : false;
  }
}
