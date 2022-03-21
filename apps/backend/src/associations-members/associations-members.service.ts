import { Injectable } from '@nestjs/common';
import { CreateAssociationsMemberDto } from './dto/create-associations-member.dto';
import { UpdateAssociationsMemberDto } from './dto/update-associations-member.dto';

@Injectable()
export class AssociationsMembersService {
  create(createAssociationsMemberDto: CreateAssociationsMemberDto) {
    return 'This action adds a new associationsMember';
  }

  findAll() {
    return `This action returns all associationsMembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} associationsMember`;
  }

  update(id: number, updateAssociationsMemberDto: UpdateAssociationsMemberDto) {
    return `This action updates a #${id} associationsMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} associationsMember`;
  }
}
