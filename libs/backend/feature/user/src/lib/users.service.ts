import {
  AssociationAndRoleNameDto,
  AssociationOfUserDto,
  QueryPaginationDto,
  SimpleUserDto,
  UpdateUserDto,
  UpdateUserFirstLastNameDto,
  UserDto,
  UserIdAndEmailDto,
} from '@stud-asso/shared/dtos';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(query: QueryPaginationDto): Promise<UserDto[]> {
    return this.userRepository.findAll(query);
  }

  public async findAllIdAndEmail(query: QueryPaginationDto): Promise<UserIdAndEmailDto[]> {
    return this.userRepository.findAllIdAndEmail(query);
  }

  public async findAssoOfUser(id: number): Promise<AssociationOfUserDto> {
    const res = await this.userRepository.findAssoOfUser(id);
    return {
      id: res.id,
      associationsId: res.associationsMembers?.map((association) => ({
        id: association.associationId,
        name: association.association.name,
      })),
    };
  }

  public async findAllByName(name: string, query: QueryPaginationDto): Promise<UserDto[]> {
    return this.userRepository.findAllByName(name, query);
  }

  public async findCurrentUserInfo(userId: number): Promise<SimpleUserDto> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }
    return {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      isSchoolEmployee: user.isSchoolEmployee,
    };
  }

  public async findCurrentUserAsso(userId: number, query: QueryPaginationDto): Promise<AssociationAndRoleNameDto[]> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }
    const associationsWithRoles = await this.userRepository.findCurrentUserAsso(userId, query);
    return associationsWithRoles.map((associationWithRole) => ({
      associationName: associationWithRole.association.name,
      roleName: associationWithRole.role.name,
      associationId: associationWithRole.association.id,
    }));
  }

  public async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }
    return user;
  }

  public async updateCurrentUserInfo(
    userId: number,
    updateUserDto: UpdateUserFirstLastNameDto
  ): Promise<SimpleUserDto> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }
    return this.userRepository.update(userId, updateUserDto);
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }

    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'email') {
          throw new Error(ERROR.EMAIL_ALREADY_USED);
        }
      }
      throw error;
    }
  }

  public async delete(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }
}
