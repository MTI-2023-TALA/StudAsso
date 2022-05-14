import { AssociationDto, CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';

import { Association } from '@stud-asso/backend/core/orm';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AssociationRepository extends BaseRepository<Association, CreateAssociationDto, UpdateAssociationDto> {
  constructor(@InjectRepository(Association) private readonly associationRepository: Repository<Association>) {
    super(associationRepository);
  }
}
