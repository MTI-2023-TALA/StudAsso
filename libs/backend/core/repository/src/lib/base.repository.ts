import { Repository, UpdateResult } from 'typeorm';

import { Base } from '@stud-asso/backend/core/orm';

export abstract class BaseRepository<Entity extends Base, CreateEntity, UpdateEntity> {
  constructor(private readonly baseRepository: Repository<Entity>) {}

  public async create(createEntity: CreateEntity): Promise<any> {
    // TODO: Change type once we can upgrade @nestjs/typeorm
    return this.baseRepository.save(createEntity as any);
  }

  public async findAll(): Promise<Entity[]> {
    return this.baseRepository.find();
  }

  public async findOne(id: number): Promise<Entity> {
    return this.baseRepository.findOne(id);
  }

  public async update(id: number, updateEntity: UpdateEntity): Promise<UpdateResult> {
    return this.baseRepository.update(id, updateEntity as any);
  }

  public async delete(id: number): Promise<UpdateResult> {
    return this.baseRepository.softDelete(id);
  }
}
