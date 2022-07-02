import {
  AssociationDto,
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
        description: createAssociationDto.description,
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
    return this.associationRepository.findAllWithPresident();
  }

  public async findOneWithPresident(id: number): Promise<AssociationWithPresidentDto> {
    const asso = await this.associationRepository.findOneWithPresident(id);
    if (!asso) {
      throw new Error('Association Not Found');
    }
    return asso;
  }

  public async findAssociationPresident(associationId: number): Promise<UserDto> {
    const president = await this.associationRepository.findAssociationPresident(associationId);
    if (!president) {
      throw new Error('Association Not Found');
    }
    return president;
  }

  public async update(id: number, updateBaseDto: UpdateAssociationDto): Promise<any> {
    const asso = await this.associationRepository.findOne(id);
    if (!asso) {
      throw new Error('Association Not Found');
    }

    try {
      return await this.associationRepository.update(id, updateBaseDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'name,') {
          throw new Error('Association Name Already Exists');
        }
      }
    }
  }

  public async delete(id: number): Promise<any> {
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
}
