import {
  AddRoleToUserDto,
  AssociationsMemberDto,
  CreateRoleDto,
  QueryPaginationDto,
  RoleDto,
  RoleOnlyPermissionsDto,
  UpdateRoleDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';
import { PermissionId } from '@stud-asso/shared/permission';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(
    private readonly associationsMemberRepository: AssociationsMemberRepository,
    private readonly associationRepository: AssociationRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async create(associationId: number, createRoleDto: CreateRoleDto): Promise<RoleDto> {
    try {
      const createdRole = await this.roleRepository.create({ ...createRoleDto, associationId });
      return { ...createdRole, permissions: createdRole.permissions as PermissionId[] };
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

  public async addRoleToUser(
    associationId: number,
    addRoleToUserDto: AddRoleToUserDto
  ): Promise<AssociationsMemberDto> {
    const user = await this.userRepository.findOne(addRoleToUserDto.userId);
    if (!user) throw new Error(ERROR.USER_NOT_FOUND);

    const asso = await this.associationRepository.findOne(associationId);
    if (!asso) throw new Error(ERROR.ASSO_NOT_FOUND);

    await this.verifyIfRoleCanBeAdded(associationId, addRoleToUserDto);
    return await this.associationsMemberRepository.linkUserToRole({ ...addRoleToUserDto, associationId });
  }

  public async findAll(id: number, query: QueryPaginationDto): Promise<RoleDto[]> {
    const association = await this.associationRepository.findOne(id);
    if (!association) throw new Error(ERROR.ASSO_NOT_FOUND);
    return (await this.roleRepository.findAll(id, query)).map((role) => ({
      ...role,
      permissions: role.permissions as PermissionId[],
    }));
  }

  public async getMyPermissions(assoId: number, userId: number): Promise<RoleOnlyPermissionsDto> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new Error(ERROR.USER_NOT_FOUND);

    const asso = await this.associationRepository.findOne(assoId);
    if (!asso) throw new Error(ERROR.ASSO_NOT_FOUND);

    const perms = await this.associationsMemberRepository.findAssoMemberPermissions({ assoId, userId });
    return {
      permissions: perms.role.permissions as PermissionId[],
    };
  }

  public async findOne(id: number): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);
    return { ...role, permissions: role.permissions as PermissionId[] };
  }

  public async updateUserRole(
    associationId: number,
    addRoleToUserDto: AddRoleToUserDto
  ): Promise<AssociationsMemberDto> {
    const assoMember = await this.associationsMemberRepository.findOne(associationId, addRoleToUserDto.userId);
    if (!assoMember) throw new Error(ERROR.USER_NOT_MEMBER_OF_ASSO);

    const oldRole = await this.roleRepository.findOne(assoMember.roleId);
    if (oldRole.name === 'Président') throw new Error(ERROR.CANNOT_UPDATE_PRESIDENT);

    await this.verifyIfRoleCanBeAdded(associationId, addRoleToUserDto);
    return await this.associationsMemberRepository.update({ ...addRoleToUserDto, associationId });
  }

  public async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleDto> {
    const role = await this.roleRepository.findOne(id);
    if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);
    if (role.name === 'Président') throw new Error(ERROR.CANNOT_UPDATE_ROLE);

    try {
      const updatedRole = await this.roleRepository.update(id, updateRoleDto);
      return {
        ...updatedRole,
        permissions: updatedRole.permissions as PermissionId[],
      };
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
    if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);
    if (role.name === 'Président') throw new Error(ERROR.CANNOT_DELETE_ROLE);
    const deletedRole = await this.roleRepository.delete(id);
    return {
      ...deletedRole,
      permissions: deletedRole.permissions as PermissionId[],
    };
  }

  private async verifyIfRoleCanBeAdded(associationId: number, addRoleToUserDto: AddRoleToUserDto): Promise<void> {
    const role = await this.roleRepository.findOne(addRoleToUserDto.roleId);
    if (!role) throw new Error(ERROR.ROLE_NOT_FOUND);

    if (role.associationId !== associationId) throw new Error(ERROR.ROLE_NOT_IN_ASSO);
    if (role.name === 'Président') throw new Error(ERROR.CANNOT_ADD_PRESIDENT);
    // if (role.name === 'Président') {
    // const presidentOfAsso = await this.associationRepository.findAssociationPresident(associationId);
    // if (presidentOfAsso) throw new Error(ERROR.ASSO_ALREADY_HAS_PRESIDENT);
    // }
  }
}
