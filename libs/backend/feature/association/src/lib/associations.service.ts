import { CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';

import { Association } from '@stud-asso/backend/core/orm';
import { AssociationRepository } from '@stud-asso/backend/core/repository';
import { BaseService } from '@stud-asso/backend-core-base';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssociationsService extends BaseService<Association, CreateAssociationDto, UpdateAssociationDto> {
  constructor(private readonly associationRepository: AssociationRepository) {
    super(associationRepository);
  }
}
