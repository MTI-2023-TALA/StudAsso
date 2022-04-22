import { Base } from '@stud-asso/backend/core/orm';
import { BaseRepository } from '@stud-asso/backend/core/repository';
import { IBaseService } from './ibase.service';
import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

@Injectable()
export abstract class BaseService<Entity extends Base, CreateDto, UpdateDto>
  implements IBaseService<Entity, CreateDto, UpdateDto>
{
  constructor(private readonly baseRepository: BaseRepository<Entity, CreateDto, UpdateDto>) {}

  public async create(createBaseDto: CreateDto): Promise<any> {
    return this.baseRepository.create(createBaseDto as any);
  }

  public async findAll(): Promise<Entity[]> {
    return this.baseRepository.findAll();
  }

  public async findOne(id: number): Promise<Entity> {
    return this.baseRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateDto): Promise<UpdateResult> {
    return this.baseRepository.update(id, updateBaseDto as any);
  }

  public async remove(id: number): Promise<UpdateResult> {
    return this.baseRepository.remove(id);
  }
}
