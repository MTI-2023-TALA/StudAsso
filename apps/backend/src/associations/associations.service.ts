import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';
import { Like, Repository } from 'typeorm';
import { BaseService } from '@stud-asso/backend/utils/base';
import { Association } from './entities/association.entity';
import { AssociationsMember } from '../associations-members/entities/associations-member.entity';

@Injectable()
export class AssociationsService extends BaseService<Association, CreateAssociationDto, UpdateAssociationDto> {
  constructor(
    @InjectRepository(Association)
    private readonly associationRepository: Repository<Association>
  ) {
    super(associationRepository);
  }

  findAllByName(name: string): Promise<Association[]> {
    return this.associationRepository.find({ name: Like(`%${name}%`) });
  }

  async getAssociationsFromAssociationsMembers(assoMembers: AssociationsMember[]): Promise<Association[]> {
    const associations = [];
    for (const member of assoMembers) {
      associations.push(await this.associationRepository.findOne(member.associationId));
    }

    return associations;
  }
}
