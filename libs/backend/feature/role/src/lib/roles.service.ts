import { AddRoleToUserDto, AssociationsMemberDto, CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';

import { ERROR } from '@stud-asso/backend/core/error';
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
          throw new Error(ERROR.ROLE_NAME_ALREADY_EXISTS);
        }

        if (error.code === 'P2003' && error.meta.field_name === 'association (index)') {
          throw new Error(ERROR.ASSO_NOT_FOUND);
        }
      }
    }
  }

  public async addRoleToUser(associationId, addRoleToUserDto: AddRoleToUserDto): Promise<AssociationsMemberDto> {
    const user = await this.userRepository.findOne(addRoleToUserDto.userId);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }

    const asso = await this.associationRepository.findOne(associationId);
    if (!asso) {
      throw new Error(ERROR.ASSO_NOT_FOUND);
    }

    const role = await this.roleRepository.findOne(addRoleToUserDto.roleId);
    if (!role) {
      throw new Error(ERROR.ROLE_NOT_FOUND);
    }

    return await this.associationsMemberRepository.linkUserToRole({ ...addRoleToUserDto, associationId });
  }

  public async findAll(id: number): Promise<RoleDto[]> {
    const association = await this.associationRepository.findOne(id);
    if (!association) throw new Error(ERROR.ASSO_NOT_FOUND);
    return this.roleRepository.findAll(id);
  }

  public async findOne(id: number): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);
    return role;
  }

  public async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);
    if (role.name === 'Président') throw new Error(ERROR.CANNOT_UPDATE_ROLE);

    try {
      return await this.roleRepository.update(id, updateRoleDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name' && error.meta.target[1] === 'association_id') {
          throw new Error(ERROR.ROLE_NAME_ALREADY_EXISTS);
        }
      }
    }
  }

  public async delete(id: number): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error('Role Not Found');
    if (role.name === 'Président') throw new Error(ERROR.CANNOT_DELETE_ROLE);
    return this.roleRepository.delete(id);
  }
}
