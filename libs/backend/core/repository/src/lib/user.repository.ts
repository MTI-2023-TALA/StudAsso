import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';

import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@stud-asso/backend/core/orm';

@Injectable()
export class UserRepository extends BaseRepository<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }
}
