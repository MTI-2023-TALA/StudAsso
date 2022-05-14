import { CreateUserDto, UpdateUserDto, UserDto, UserIdAndEmail } from '@stud-asso/shared/dtos';

import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createBaseDto: CreateUserDto): Promise<UserDto> {
    return this.userRepository.create(createBaseDto);
  }

  public async findAllIdAndEmail(): Promise<UserIdAndEmail[]> {
    return this.userRepository.findAllIdAndEmail();
  }

  public async findAll(): Promise<UserDto[]> {
    return this.userRepository.findAll();
  }

  public async findOne(id: number): Promise<UserDto> {
    return this.userRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateBaseDto);
  }

  public async delete(id: number): Promise<UpdateResult> {
    return this.userRepository.delete(id);
  }
}
