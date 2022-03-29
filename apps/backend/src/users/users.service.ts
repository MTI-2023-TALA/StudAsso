import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';

@Injectable()
export class UsersService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }
}
