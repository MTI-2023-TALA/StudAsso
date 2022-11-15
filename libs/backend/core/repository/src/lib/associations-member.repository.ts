import {
  AddRoleToUserModel,
  AssoMemberPermissionsModel,
  AssociationMemberWithRoleWithoutIdsModel,
  QueryAssociationMembersModel,
  SimpleAssociationsMemberModel,
  UserIdAssoIdModel,
} from '@stud-asso/backend/core/model';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';
import { SORT_ASSO_MEMBERS } from '@stud-asso/shared/dtos';

const selectAssoMemberModel = {
  associationId: true,
  userId: true,
  roleId: true,
};

@Injectable()
export class AssociationsMemberRepository {
  constructor(private prisma: PrismaService) {}

  public async linkUserToRole(addRoleToUserModel: AddRoleToUserModel): Promise<SimpleAssociationsMemberModel> {
    return this.prisma.associationMember.create({ data: addRoleToUserModel, select: selectAssoMemberModel });
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

  public async isUserMemberOfAssociation(userIdAndUserPayload: UserIdAssoIdModel): Promise<boolean> {
    const isMemberOfAsso = await this.prisma.associationMember.findFirst({
      where: {
        userId: userIdAndUserPayload.userId,
        associationId: userIdAndUserPayload.assoId,
      },
    });
    return isMemberOfAsso ? true : false;
  }

  public async isUserPresidentOfAssociation(userIdAndUserPayload: UserIdAssoIdModel): Promise<boolean> {
    const isPresidentOfAsso = await this.prisma.associationMember.findFirst({
      where: {
        userId: userIdAndUserPayload.userId,
        associationId: userIdAndUserPayload.assoId,
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
            name: true,
            permissions: true,
          },
        },
      },
    });
  }

  public findOne(associationId: number, userId: number): Promise<SimpleAssociationsMemberModel> {
    return this.prisma.associationMember.findUnique({
      where: {
        associationId_userId: { associationId, userId },
      },
      select: selectAssoMemberModel,
    });
  }

  public async update(addRoleToUserModel: AddRoleToUserModel): Promise<SimpleAssociationsMemberModel> {
    return this.prisma.associationMember.update({
      where: {
        associationId_userId: { associationId: addRoleToUserModel.associationId, userId: addRoleToUserModel.userId },
      },
      data: addRoleToUserModel,
      select: selectAssoMemberModel,
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
