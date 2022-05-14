import { AssociationsMember, Role } from '@stud-asso/backend/core/orm';
import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository extends BaseRepository<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(AssociationsMember) private readonly associationsMemberRepository: Repository<AssociationsMember>
  ) {
    super(roleRepository);
  }

  public async createRolePresident(associationId: number) {
    return this.roleRepository.save({ name: 'Président', associationId });
  }

  public async linkUserToRole(associationId: number, userId: number, roleId: number) {
    return this.associationsMemberRepository.save({ associationId, userId, roleId });
  }
}
