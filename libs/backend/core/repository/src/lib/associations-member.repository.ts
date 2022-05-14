import { AssociationsMember } from '@stud-asso/backend/core/orm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AssociationsMemberRepository {
  constructor(
    @InjectRepository(AssociationsMember) private readonly associationsMemberRepository: Repository<AssociationsMember>
  ) {}

  public async linkUserToRole(associationId: number, userId: number, roleId: number): Promise<AssociationsMember> {
    return this.associationsMemberRepository.save({ associationId, userId, roleId });
  }
}
