import { UpdateUserDto, UserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAllIdAndEmail(): Promise<UserIdAndEmailDto[]> {
    return this.userRepository.findAllIdAndEmail();
  }

  public async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  public async findAllByName(name: string): Promise<UserDto[]> {
    return this.userRepository.findAllByName(name);
  }

  public async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  public async update(id: number, updateBaseDto: UpdateUserDto): Promise<any> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    try {
      return await this.userRepository.update(id, updateBaseDto as any);
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Email already used');
      }
    }
  }

  public async delete(id: number): Promise<any> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.delete(id);
  }

  public async findAssoOfUser(id: number) {
    return this.userRepository.findAssoOfUser(id);
  }
}
