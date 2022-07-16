import { AssociationMember } from '@prisma/client';
import { AssociationMemberWithRoleWithoutIdsModel } from '@stud-asso/backend/core/model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationsMemberRepository {
  constructor(private prisma: PrismaService) {}

  public async linkUserToRole(associationId: number, userId: number, roleId: number): Promise<AssociationMember> {
    return this.prisma.associationMember.create({ data: { associationId, userId, roleId } });
  }

  public findAssociationMembersWithRoles(associationId: number): Promise<AssociationMemberWithRoleWithoutIdsModel[]> {
    return this.prisma.associationMember.findMany({
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
            name: true,
          },
        },
      },
    });
  }
}
