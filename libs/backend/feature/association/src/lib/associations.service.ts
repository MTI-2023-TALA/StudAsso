import {
  AssociationDto,
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';

import { Injectable } from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AssociationsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly roleRepository: RoleRepository,
    private readonly associationsMemberRepository: AssociationsMemberRepository
  ) {}

  public async create(createAssociationDto: CreateAssociationDto): Promise<AssociationDto> {
    // TODO: bug where presidentId is returned in Dto TO FIX
    try {
      const createdAsso = await this.associationRepository.create(createAssociationDto);
      const { id } = await this.roleRepository.createRolePresident(createdAsso.id);
      await this.associationsMemberRepository.linkUserToRole(createdAsso.id, createAssociationDto.presidentId, id);
      return createdAsso;
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        if (error?.constraint === 'unique_association_name') {
          throw new Error('Association Name Already Exists');
        }

        if (error?.constraint === 'unique_role_name_per_association') {
          throw new Error('Role Name Already Exists In This Association');
        }
      }
    }
  }

  public async findAllWithPresident(): Promise<AssociationWithPresidentDto[]> {
    const associationsWithPresident = await this.associationRepository.findAllWithPresident();
    return associationsWithPresident.map(
      (asso) => new AssociationWithPresidentDto(asso['id'], asso['name'], asso['description'], asso['president_id'])
    );
  }

  public async findOneWithPresident(id: number): Promise<AssociationWithPresidentDto> {
    const asso = await this.associationRepository.findOneWithPresident(id);
    if (!asso) {
      throw new Error('Association Not Found');
    }
    return new AssociationWithPresidentDto(asso['id'], asso['name'], asso['description'], asso['president_id']);
  }

  public async update(id: number, updateBaseDto: UpdateAssociationDto): Promise<UpdateResult> {
    return this.associationRepository.update(id, updateBaseDto);
  }

  public async delete(id: number): Promise<UpdateResult> {
    return this.associationRepository.delete(id);
  }
}
