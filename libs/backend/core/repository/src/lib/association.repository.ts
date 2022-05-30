import { CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';
import { EntityManager, Repository, getManager } from 'typeorm';

import { Association } from '@stud-asso/backend/core/orm';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociationRepository extends BaseRepository<Association, CreateAssociationDto, UpdateAssociationDto> {
  public entityManager: EntityManager = getManager();

  constructor(@InjectRepository(Association) private readonly associationRepository: Repository<Association>) {
    super(associationRepository);
  }

  public async findAllWithPresident(): Promise<Association[]> {
    return this.entityManager.query(
      `
      SELECT associations.id, associations.name, associations.description, associations_members.user_id AS president_id
      FROM associations
      LEFT JOIN roles ON roles.association_id = associations.id
      LEFT JOIN associations_members on roles.id = associations_members.role_id
      WHERE roles.name = 'Président';
      `
    );
  }

  public async findOneWithPresident(associationId: number): Promise<Association> {
    const result = await this.entityManager.query(
      `
      SELECT associations.id, associations.name, associations.description, associations_members.user_id AS president_id
      FROM associations
      LEFT JOIN roles ON roles.association_id = associations.id
      LEFT JOIN associations_members on roles.id = associations_members.role_id
      WHERE roles.name = 'Président' AND associations.id = ${associationId}
      LIMIT 1;
      `
    );
    return result[0];
  }
}
