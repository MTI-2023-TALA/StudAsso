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
import { UpdateResult } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AssociationsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly roleRepository: RoleRepository,
    private readonly associationsMemberRepository: AssociationsMemberRepository
  ) {}

  public async create(createAssociationDto: CreateAssociationDto): Promise<AssociationDto> {
    // TODO: bug where presidentId is returned in Dto TO FIX
    const createdAsso = await this.associationRepository.create(createAssociationDto);
    const { id } = await this.roleRepository.createRolePresident(createdAsso.id);
    await this.associationsMemberRepository.linkUserToRole(createdAsso.id, createAssociationDto.presidentId, id);
    return createdAsso;
  }

  public async findAllWithPresident(): Promise<AssociationWithPresidentDto[]> {
    const associationsWithPresident = await this.associationRepository.findAllWithPresident();
    return associationsWithPresident.map((asso) =>
      plainToInstance(AssociationWithPresidentDto, {
        ...asso, // TODO: renvoie president_id et pas presidentId
      })
    );
  }

  public async findOneWithPresident(id: number): Promise<AssociationWithPresidentDto> {
    const association = await this.associationRepository.findOneWithPresident(id);
    return await plainToInstance(AssociationWithPresidentDto, {
      ...association,
    })[0]; // TODO: renvoie president_id et pas presidentId
  }

  public async update(id: number, updateBaseDto: UpdateAssociationDto): Promise<UpdateResult> {
    return this.associationRepository.update(id, updateBaseDto);
  }

  public async delete(id: number): Promise<UpdateResult> {
    return this.associationRepository.delete(id);
  }
}
