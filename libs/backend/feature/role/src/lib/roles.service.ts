import { CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { RoleRepository } from '@stud-asso/backend/core/repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async create(createBaseDto: CreateRoleDto): Promise<RoleDto> {
    try {
      return await this.roleRepository.create(createBaseDto as any);
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Name already exists');
      }
    }
  }

  public async findAll(id: number): Promise<RoleDto[]> {
    return this.roleRepository.findAllAsso(id);
  }

  public async findOne(id: number): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role not found');
    return role;
  }

  public async update(id: number, updateBaseDto: UpdateRoleDto): Promise<UpdateResult> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role not found');
    if (role.name === 'Président') throw new Error('Cannot update role');

    try {
      return await this.roleRepository.update(id, updateBaseDto as any);
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Name already exists');
      }
    }
  }

  public async delete(id: number): Promise<UpdateResult> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role not found');
    if (role.name === 'Président') throw new Error('Cannot delete role');
    return this.roleRepository.delete(id);
  }
}
