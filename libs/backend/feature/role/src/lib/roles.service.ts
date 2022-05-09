import { CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@stud-asso/backend/core/repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async create(createBaseDto: CreateRoleDto): Promise<any> {
    return this.roleRepository.create(createBaseDto as any);
  }

  public async findAll(): Promise<RoleDto[]> {
    return this.roleRepository.findAll();
  }

  public async findOne(id: number): Promise<RoleDto> {
    return this.roleRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateRoleDto): Promise<UpdateResult> {
    return this.roleRepository.update(id, updateBaseDto as any);
  }

  public async remove(id: number): Promise<UpdateResult> {
    return this.roleRepository.remove(id);
  }
}
