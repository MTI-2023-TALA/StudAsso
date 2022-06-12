import { CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';
import { EntityManager, Repository, getManager } from 'typeorm';

import { Association } from '@stud-asso/backend/core/orm';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

@Injectable()
export class AssociationRepository extends BaseRepository<Association, CreateAssociationDto, UpdateAssociationDto> {
  public entityManager: EntityManager = getManager();

  constructor(@InjectRepository(Association) private readonly associationRepository: Repository<Association>) {
    super(associationRepository);
  }

  public async findAllWithPresident(): Promise<Association[]> {
    return this.entityManager.query(
      `
      SELECT associations.id, associations.name, associations.description,
            am.user_id AS president_id, u.firstname AS firstname,
            u.lastname AS lastname, u.email AS email,
            u.is_school_employee AS is_school_employee
      FROM associations
      LEFT JOIN roles ON associations.id = roles.association_id
      LEFT JOIN associations_members am on associations.id = am.association_id
      LEFT JOIN users u on am.user_id = u.id
      WHERE roles.name = 'Président' AND associations.deleted_at IS NULL;
      `
    );
  }

  public async findOneWithPresident(associationId: number): Promise<Association> {
    const result = await this.entityManager.query(
      `
      SELECT associations.id, associations.name, associations.description,
            am.user_id AS president_id, u.firstname AS firstname,
            u.lastname AS lastname, u.email AS email,
            u.is_school_employee AS is_school_employee
      FROM associations
      LEFT JOIN roles ON associations.id = roles.association_id
      LEFT JOIN associations_members am on associations.id = am.association_id
      LEFT JOIN users u on am.user_id = u.id
      WHERE roles.name = 'Président' AND associations.deleted_at IS NULL AND associations.id = ${associationId}
      LIMIT 1;
      `
    );
    return result[0];
  }

  public async findAssociationPresident(associationId: number): Promise<Association> {
    const result = await this.entityManager.query(
      `
      SELECT u.id AS id, u.firstname AS firstname, u.lastname AS lastname, u.email AS email, u.is_school_employee AS is_school_employee
      FROM associations
      LEFT JOIN roles ON associations.id = roles.association_id
      LEFT JOIN associations_members am on associations.id = am.association_id
      LEFT JOIN users u on am.user_id = u.id
      WHERE roles.name = 'Président' AND associations.deleted_at IS NULL AND associations.id = ${associationId}
      LIMIT 1;
      `
    );
    return result[0];
  }
}
