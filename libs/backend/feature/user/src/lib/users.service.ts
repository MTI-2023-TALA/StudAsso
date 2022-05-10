import { CreateUserDto, UpdateUserDto, UserDto } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createBaseDto: CreateUserDto): Promise<any> {
    return this.userRepository.create(createBaseDto as any);
  }

  public async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  public async findOne(id: number): Promise<UserDto> {
    return this.userRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateBaseDto as any);
  }

  public async delete(id: number): Promise<UpdateResult> {
    return this.userRepository.delete(id);
  }
}
