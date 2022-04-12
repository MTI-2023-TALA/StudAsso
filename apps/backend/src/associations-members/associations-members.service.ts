import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@stud-asso/backend/utils/base';
import { CreateAssociationsMemberDto, UpdateAssociationsMemberDto } from '@stud-asso/shared/dtos';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Role } from '../roles/entities/role.entity';
import { AssociationsMember } from './entities/associations-member.entity';

@Injectable()
export class AssociationsMembersService extends BaseService<
  AssociationsMember,
  CreateAssociationsMemberDto,
  UpdateAssociationsMemberDto
> {
  constructor(
    @InjectRepository(AssociationsMember)
    private readonly associationsMemberRepository: Repository<AssociationsMember>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {
    super(associationsMemberRepository);
  }

  // override create from base
  public async create(createAssociationsMemberDto: CreateAssociationsMemberDto): Promise<any> {
    const role = await this.roleRepository.findOne(createAssociationsMemberDto.roleId);
    if (role.associationId != createAssociationsMemberDto.associationId) {
      throw new HttpException('Trying to assign a role from a different association to a user!', HttpStatus.FORBIDDEN);
    }

    return this.associationsMemberRepository.save(createAssociationsMemberDto);
  }

  public async findOneAssoMember(associationId: number, userId: number): Promise<AssociationsMember> {
    return this.associationsMemberRepository.findOne({ associationId: associationId, userId: userId });
  }

  public async updateAssoMember(
    associationId: number,
    userId: number,
    updateAssociationsMemberDto: UpdateAssociationsMemberDto
  ): Promise<UpdateResult> {
    const role = await this.roleRepository.findOne(updateAssociationsMemberDto.roleId);

    // trying to assign a user a role that is from another association
    if (role.associationId != associationId) {
      throw new HttpException('Trying to assign a role from a different association to a user!', HttpStatus.FORBIDDEN);
    }

    return this.associationsMemberRepository.update(
      { associationId: associationId, userId: userId },
      updateAssociationsMemberDto
    );
  }

  public async removeAssoMember(associationId: number, userId: number): Promise<DeleteResult> {
    // TODO: softDelete on ID fucks it up
    // return this.associationsMemberRepository.softDelete({ associationId: associationId, userId: userId });
    return this.associationsMemberRepository.delete({ associationId: associationId, userId: userId });
  }

  public async getUsersinAssociation(associationId: number): Promise<AssociationsMember[]> {
    return this.associationsMemberRepository.find({ associationId: associationId });
  }
}
