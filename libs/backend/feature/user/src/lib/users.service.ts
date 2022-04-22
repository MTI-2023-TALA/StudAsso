import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend-core-base';
import { Injectable } from '@nestjs/common';
import { User } from '@stud-asso/backend/core/orm';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class UsersService extends BaseService<User, CreateUserDto, UpdateUserDto> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
