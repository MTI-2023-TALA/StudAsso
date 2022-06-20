import { AddRoleToUserDto, AssociationsMemberDto, CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';

import { Injectable } from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';

@Injectable()
export class RolesService {
  constructor(
    private readonly associationsMemberRepository: AssociationsMemberRepository,
    private readonly associationRepository: AssociationRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async create(createBaseDto: CreateRoleDto): Promise<RoleDto> {
    try {
      return await this.roleRepository.create(createBaseDto);
    } catch (error) {
      //TODO: handle error
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Name already exists');
      }
    }
  }

  public async addRoleToUser(addRoleToUserDto: AddRoleToUserDto): Promise<AssociationsMemberDto> {
    const user = await this.userRepository.findOne(addRoleToUserDto.userId);
    if (!user) {
      throw new Error('User Not Found');
    }

    const asso = await this.associationRepository.findOne(addRoleToUserDto.associationId);
    if (!asso) {
      throw new Error('Association Not Found');
    }

    const role = await this.roleRepository.findOne(addRoleToUserDto.roleId);
    if (!role) {
      throw new Error('Role Not Found');
    }

    return await this.associationsMemberRepository.linkUserToRole(
      addRoleToUserDto.associationId,
      addRoleToUserDto.userId,
      addRoleToUserDto.roleId
    );
  }

  public async findAll(id: number): Promise<RoleDto[]> {
    return this.roleRepository.findAllAsso(id);
  }

  public async findOne(id: number): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role not found');
    return role;
  }

  public async update(id: number, updateBaseDto: UpdateRoleDto): Promise<any> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role not found');
    if (role.name === 'Président') throw new Error('Cannot update role');

    try {
      return await this.roleRepository.update(id, updateBaseDto);
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Name already exists');
      }
    }
  }

  public async delete(id: number): Promise<any> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role not found');
    if (role.name === 'Président') throw new Error('Cannot delete role');
    return this.roleRepository.delete(id);
  }
}
