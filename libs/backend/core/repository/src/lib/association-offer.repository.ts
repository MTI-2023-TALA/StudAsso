import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationOfferRepository {
  constructor(private prisma: PrismaService) {}
}
