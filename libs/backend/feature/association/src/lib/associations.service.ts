import {
  AssociationDto,
  AssociationMemberWithRoleDto,
  AssociationWithPresidentDto,
  CreateAssociationDto,
  UpdateAssociationDto,
  UserDto,
} from '@stud-asso/shared/dtos';
import {
  AssociationRepository,
  AssociationsMemberRepository,
  RoleRepository,
  UserRepository,
} from '@stud-asso/backend/core/repository';

import { AssociationWithPresidentModel } from '@stud-asso/backend/core/model';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssociationsService {
  constructor(
    private readonly associationRepository: AssociationRepository,
    private readonly roleRepository: RoleRepository,
    private readonly associationsMemberRepository: AssociationsMemberRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async create(createAssociationDto: CreateAssociationDto): Promise<AssociationDto> {
    const user = await this.userRepository.findOne(createAssociationDto.presidentId);
    if (!user) throw new Error('President Not Found');

    // TODO: bug where presidentId is returned in Dto TO FIX
    try {
      const createdAsso = await this.associationRepository.create({
        name: createAssociationDto.name,
        description: createAssociationDto?.description,
      });
      const { id } = await this.roleRepository.createRolePresident(createdAsso.id);
      await this.associationsMemberRepository.linkUserToRole(createdAsso.id, createAssociationDto.presidentId, id);
      return createdAsso;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name,') {
          throw new Error('Association Name Already Exists');
        }
      }
    }
  }

  public async findAllWithPresident(): Promise<AssociationWithPresidentDto[]> {
    const assos = await this.associationRepository.findAllWithPresident();
    return assos.map((a) => this.formatAsso(a));
  }

  public async findOneWithPresident(id: number): Promise<AssociationWithPresidentDto> {
    const asso = await this.associationRepository.findOneWithPresident(id);
    if (!asso) {
      throw new Error('Association Not Found');
    }
    return this.formatAsso(asso);
  }

  public async findAssociationPresident(associationId: number): Promise<UserDto> {
    const president = await this.associationRepository.findAssociationPresident(associationId);
    if (!president) {
      throw new Error('Association Not Found');
    }
    return {
      id: president.associationsMembers[0].userId,
      firstname: president.associationsMembers[0].user.firstname,
      lastname: president.associationsMembers[0].user.lastname,
      email: president.associationsMembers[0].user.email,
      isSchoolEmployee: president.associationsMembers[0].user.isSchoolEmployee,
    };
  }

  public async findAssociationMembersWithRoles(associationId: number): Promise<AssociationMemberWithRoleDto[]> {
    const association = await this.associationRepository.findOne(associationId);
    if (!association) {
      throw new Error('Association Not Found');
    }

    const membersWithRoles = await this.associationsMemberRepository.findAssociationMembersWithRoles(associationId);
    return membersWithRoles.map((member) => ({
      firstname: member.user.firstname,
      lastname: member.user.lastname,
      roleName: member.role.name,
    }));
  }

  public async update(id: number, updateAssociationDto: UpdateAssociationDto): Promise<AssociationDto> {
    const asso = await this.associationRepository.findOne(id);
    if (!asso) {
      throw new Error('Association Not Found');
    }

    try {
      return await this.associationRepository.update(id, updateAssociationDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name,') {
          throw new Error('Association Name Already Exists');
        }
      }
    }
  }

  public async delete(id: number): Promise<AssociationDto> {
    try {
      return await this.associationRepository.delete(id);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Association To Delete Not Found');
        }
      }
    }
  }

  private formatAsso(asso: AssociationWithPresidentModel): AssociationWithPresidentDto {
    return {
      id: asso.id,
      name: asso.name,
      description: asso.description,
      presidentId: asso.associationsMembers[0].userId,
      firstname: asso.associationsMembers[0].user.firstname,
      lastname: asso.associationsMembers[0].user.lastname,
      email: asso.associationsMembers[0].user.email,
      isSchoolEmployee: asso.associationsMembers[0].user.isSchoolEmployee,
    };
  }
}
