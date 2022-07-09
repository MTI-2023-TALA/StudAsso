import { AddRoleToUserDto, AssociationsMemberDto, CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(
    private readonly associationsMemberRepository: AssociationsMemberRepository,
    private readonly associationRepository: AssociationRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async create(createRoleDto: CreateRoleDto): Promise<RoleDto> {
    try {
      return await this.roleRepository.create(createRoleDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name' && error.meta.target[1] === 'association_id') {
          throw new Error('Association Name Already Exists');
        }

        if (error.code === 'P2003' && error.meta.field_name === 'association (index)') {
          throw new Error('Association Not Found');
        }
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
    if (!role) throw new Error('Role Not Found');
    return role;
  }

  public async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role Not Found');
    if (role.name === 'Président') throw new Error('Cannot Update Role');

    try {
      return await this.roleRepository.update(id, updateRoleDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name' && error.meta.target[1] === 'association_id') {
          throw new Error('Association Name Already Exists');
        }
      }
    }
  }

  public async delete(id: number): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role Not Found');
    if (role.name === 'Président') throw new Error('Cannot Delete Role');
    return this.roleRepository.delete(id);
  }
}
