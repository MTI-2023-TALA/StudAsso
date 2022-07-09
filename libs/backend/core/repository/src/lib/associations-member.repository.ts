import { AssociationMember } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationsMemberRepository {
  constructor(private prisma: PrismaService) {}

  public async linkUserToRole(associationId: number, userId: number, roleId: number): Promise<AssociationMember> {
    return this.prisma.associationMember.create({ data: { associationId, userId, roleId } });
  }
}
