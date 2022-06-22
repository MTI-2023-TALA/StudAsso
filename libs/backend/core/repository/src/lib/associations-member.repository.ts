import { AssociationMember, Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationsMemberRepository {
  constructor(private prisma: PrismaService) {}

  public async linkUserToRole(
    associationId: number,
    userId: number,
    roleId: number,
    currentTransaction: Prisma.TransactionClient = null
  ): Promise<AssociationMember> {
    const client = currentTransaction ? currentTransaction : this.prisma;
    return client.associationMember.create({ data: { associationId, userId, roleId } });
  }
}
