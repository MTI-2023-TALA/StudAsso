import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  public async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
