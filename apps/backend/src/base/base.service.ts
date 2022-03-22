import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IbaseService } from './ibase.service';

@Injectable()
export class BaseService<Entity, CreateBaseDto, UpdateBaseDto> implements IbaseService<Entity, CreateBaseDto, UpdateBaseDto>{

  constructor(private readonly baseRepository : Repository<Entity>) {}

  public async create(createBaseDto: CreateBaseDto) : Promise<any> {
    // TODO: Change this once we can upgrade nest-js type orm
    return await this.baseRepository.save(createBaseDto as any);
  }

  public async findAll() : Promise<Entity[]> {
    return await this.baseRepository.find();
  }

  public async findOne(id: number) : Promise<Entity> {
    return await this.baseRepository.findOne(id);
  }

  // TODO: If we pass ID in DTO -> IGNORE IT
  public async update(id: number, updateBaseDto: UpdateBaseDto) : Promise<UpdateResult> {
    return await this.baseRepository.update(id, updateBaseDto);
  }

  public async remove(id: number) : Promise<DeleteResult> {
    return await this.baseRepository.delete(id);
  }
}
