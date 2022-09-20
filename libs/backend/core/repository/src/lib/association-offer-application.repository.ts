import { Injectable } from '@nestjs/common';
import { PrismaService } from '@stud-asso/backend/core/orm';

@Injectable()
export class AssociationOfferApplicationRepository {
  constructor(private prisma: PrismaService) {}
}
