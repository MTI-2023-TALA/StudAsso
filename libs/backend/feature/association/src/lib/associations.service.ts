import { AssociationDto, CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';

import { AssociationRepository } from '@stud-asso/backend/core/repository';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AssociationsService {
  constructor(private readonly associationRepository: AssociationRepository) {}

  public async create(createAssociationDto: CreateAssociationDto): Promise<any> {
    return this.associationRepository.create(createAssociationDto as any);
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

  public async remove(id: number): Promise<UpdateResult> {
    return this.associationRepository.remove(id);
  }
}
