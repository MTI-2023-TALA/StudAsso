import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Association } from './entities/association.entity';

@Injectable()
export class AssociationsService extends BaseService<
  Association,
  CreateAssociationDto,
  UpdateAssociationDto
> {
  constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>
  ) {
    super(associationRepository);
  }
}
