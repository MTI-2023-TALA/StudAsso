import {
  AddRoleToUserModel,
  AssociationMemberWithRoleWithoutIdsModel,
  QueryPaginationModel,
} from '@stud-asso/backend/core/model';
import { PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';

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
    const offset = queryPaginationModel.offset ? queryPaginationModel.offset : PAGINATION_BASE_OFFSET;
    const limit = queryPaginationModel.limit ? queryPaginationModel.limit : PAGINATION_BASE_LIMIT;

    return this.prisma.associationMember.findMany({
      skip: offset,
      take: limit,
      where: { associationId },
      select: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
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
