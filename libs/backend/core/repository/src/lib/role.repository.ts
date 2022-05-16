import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '@stud-asso/backend/core/orm';

@Injectable()
export class RoleRepository extends BaseRepository<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    super(roleRepository);
  }

  public async createRolePresident(associationId: number): Promise<Role> {
    return this.roleRepository.save({ name: 'Président', associationId });
  }

  public async findAllAsso(id: number): Promise<Role[]> {
    return this.roleRepository.find({ associationId: id });
  }
}
