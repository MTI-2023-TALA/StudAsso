import { AssociationDto, CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
} from '@stud-asso/backend/core/repository';

import { Injectable } from '@nestjs/common';
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
    const createdAsso = await this.associationRepository.create(createAssociationDto as any);
    const { id } = await this.roleRepository.createRolePresident(createdAsso.id);
    await this.associationsMemberRepository.linkUserToRole(createdAsso.id, createAssociationDto.presidentId, id);
    return createdAsso;
  }

  public async findAll(): Promise<AssociationDto[]> {
    return this.associationRepository.findAll();
  }

  public async findOne(id: number): Promise<AssociationDto> {
    return this.associationRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateAssociationDto): Promise<UpdateResult> {
    return this.associationRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number): Promise<UpdateResult> {
    return this.associationRepository.delete(id);
  }
}
