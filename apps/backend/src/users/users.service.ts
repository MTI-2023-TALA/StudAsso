import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend/utils/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }
}
