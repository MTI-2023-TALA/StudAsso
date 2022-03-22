import { Injectable } from '@nestjs/common';
import {
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';

@Injectable()
export class AssociationsService {
  create(createAssociationDto: CreateAssociationDto) {
    return 'This action adds a new association';
  }

  findAll() {
    return `This action returns all associations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} association`;
  }

  update(id: number, updateAssociationDto: UpdateAssociationDto) {
    return `This action updates a #${id} association`;
  }

  remove(id: number) {
    return `This action removes a #${id} association`;
  }
}
