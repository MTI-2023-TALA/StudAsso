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

  public createUser(email: string, firstname: string, lastname: string, hash: string): Promise<any> {
    return this.userRepository.save({ email, passwordHash: hash, firstname, lastname });
  }

  public updateRt(userId: number, rt: string): Promise<any> {
    return this.userRepository.update(userId, { rtHash: rt });
  }

  public findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
