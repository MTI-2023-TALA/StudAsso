import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';
import { Like, Repository, UpdateResult } from 'typeorm';

import { BaseRepository } from './base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@stud-asso/backend/core/orm';

@Injectable()
export class UserRepository extends BaseRepository<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super(userRepository);
  }

  public createUser(
    email: string,
    firstname: string,
    lastname: string,
    isSchoolEmployee: boolean,
    hash: string
  ): Promise<User> {
    return this.userRepository.save({ email, passwordHash: hash, firstname, lastname, isSchoolEmployee });
  }

  public updateRt(userId: number, rt: string): Promise<UpdateResult> {
    return this.userRepository.update(userId, { rtHash: rt });
  }

  public findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  public async findAllIdAndEmail(): Promise<User[]> {
    return this.userRepository.find({ select: ['id', 'email'] });
  }

  public async findAssoOfUser(id: number): Promise<User> {
    return this.userRepository.findOne({
      select: ['id'],
      where: { id },
      relations: ['associations'],
    });
  }

  public async findAllByName(name: string): Promise<User[]> {
    return this.userRepository.find({ where: [{ lastname: Like(`%${name}%`) }, { firstname: Like(`%${name}%`) }] });
  }
}
