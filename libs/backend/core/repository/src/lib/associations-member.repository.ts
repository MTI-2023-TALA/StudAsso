import {
  AddRoleToUserModel,
  AssoMemberPermissionsModel,
  AssociationMemberWithRoleWithoutIdsModel,
  QueryAssociationMembersModel,
  SimpleAssociationsMemberModel,
  UserIdAssoIdModel,
} from '@stud-asso/backend/core/model';

import { AssociationMember } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { SORT_ASSO_MEMBERS } from '@stud-asso/shared/dtos';

@Injectable()
export class AssociationsMemberRepository {
  constructor(private prisma: PrismaService) {}

  public async linkUserToRole(addRoleToUserDto: AddRoleToUserModel): Promise<AssociationMember> {
    return this.prisma.associationMember.create({ data: addRoleToUserDto });
  }

  public findAssociationMembersWithRoles(
    associationId: number,
    queryAssociationMembersModel: QueryAssociationMembersModel
  ): Promise<AssociationMemberWithRoleWithoutIdsModel[]> {
    const query = {
      skip: queryAssociationMembersModel.offset,
      take: queryAssociationMembersModel.limit,
      where: {
        associationId,
        role: {
          name: {
            contains: queryAssociationMembersModel.filter,
          },
        },
      },
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
      orderBy: {},
    };
    query.where['role']['name']['mode'] = 'insensitive';

    if (queryAssociationMembersModel.sort == SORT_ASSO_MEMBERS.BY_ROLE_NAME) {
      query.orderBy['role'] = { name: queryAssociationMembersModel.order };
    } else if (queryAssociationMembersModel.sort == SORT_ASSO_MEMBERS.BY_EMAIL) {
      query.orderBy['user'] = { email: queryAssociationMembersModel.order };
    }
    return this.prisma.associationMember.findMany(query);
  }

  public async isUserMemberOfAssociation(userId: number, associationId: number): Promise<boolean> {
    const isMemberOfAsso = await this.prisma.associationMember.findFirst({
      where: { userId, associationId },
    });
    return isMemberOfAsso ? true : false;
  }

  public async isUserPresidentOfAssociation(userId: number, associationId: number): Promise<boolean> {
    const isPresidentOfAsso = await this.prisma.associationMember.findFirst({
      where: {
        userId,
        associationId,
        role: {
          name: 'Président',
        },
      },
    });
    return isPresidentOfAsso ? true : false;
  }

  public async findAssoMemberPermissions(userIdAssoIdPayload: UserIdAssoIdModel): Promise<AssoMemberPermissionsModel> {
    return this.prisma.associationMember.findFirst({
      where: {
        userId: userIdAssoIdPayload.userId,
        associationId: userIdAssoIdPayload.assoId,
      },
      select: {
        role: {
          select: {
            permissions: true,
          },
        },
      },
    });
  }

  public async delete(userIdAssoIdPayload: UserIdAssoIdModel): Promise<SimpleAssociationsMemberModel> {
    return this.prisma.associationMember.delete({
      where: {
        associationId_userId: { associationId: userIdAssoIdPayload.assoId, userId: userIdAssoIdPayload.userId },
      },
      select: {
        associationId: true,
        userId: true,
        roleId: true,
      },
    });
  }
}
