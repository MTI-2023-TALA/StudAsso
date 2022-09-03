import { AssociationOfUserDto, UpdateUserDto, UserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';

import { ERROR } from '@stud-asso/backend/core/error';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  public async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }
    return user;
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
    }
  }

  public async delete(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(ERROR.USER_NOT_FOUND);
    }
    return this.userRepository.delete(id);
  }

  public async findAllIdAndEmail(): Promise<UserIdAndEmailDto[]> {
    return this.userRepository.findAllIdAndEmail();
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

  public async findAllByName(name: string): Promise<UserDto[]> {
    return this.userRepository.findAllByName(name);
  }
}
