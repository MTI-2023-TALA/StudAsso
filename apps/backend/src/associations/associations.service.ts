import { CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';

import { Association } from './entities/association.entity';
import { BaseService } from '@stud-asso/backend/utils/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AssociationsService extends BaseService<Association, CreateAssociationDto, UpdateAssociationDto> {
  constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>
  ) {
    super(associationRepository);
  }
}
