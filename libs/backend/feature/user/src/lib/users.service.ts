import { CreateUserDto, UpdateUserDto, UserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Email already used');
      }
    }
  }

  public async findAllIdAndEmail(): Promise<UserIdAndEmailDto[]> {
    return this.userRepository.findAllIdAndEmail();
  }

  public async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  public async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async update(id: number, updateBaseDto: UpdateUserDto): Promise<UpdateResult> {
    const user = this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    try {
      return await this.userRepository.update(id, updateBaseDto);
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Email already used');
      }
    }
  }

  public async delete(id: number): Promise<UpdateResult> {
    const user = this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.delete(id);
  }

  public async findAssoOfUser(id: number) {
    const res = await this.userRepository.findAssoOfUser(id);
    return { id: res.id, associationsId: res.associations.map((asso) => ({ id: asso.id, name: asso.name })) };
  }
}
