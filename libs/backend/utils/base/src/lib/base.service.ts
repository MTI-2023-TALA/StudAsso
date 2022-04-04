import { Injectable } from '@nestjs/common';
import { BaseDto, CreateBaseDto, UpdateBaseDto } from '@stud-asso/shared/dtos';
import { Repository, UpdateResult } from 'typeorm';
import { Base } from './entities/base.entity';
import { IBaseService } from './ibase.service';

@Injectable()
export abstract class BaseService<
  Entity extends Base<BaseDto>,
  CreateDto extends CreateBaseDto,
  UpdateDto extends UpdateBaseDto
> implements IBaseService<Entity, CreateBaseDto, UpdateBaseDto>
{
  constructor(private readonly baseRepository: Repository<Entity>) {}

  public async create(createBaseDto: CreateDto): Promise<any> {
    // TODO: Change type once we can upgrade @nestjs/typeorm
    return await this.baseRepository.save(createBaseDto as any);
  }

  public async findAll(): Promise<Entity[]> {
    return await this.baseRepository.find();
  }

  public async findOne(id: number): Promise<Entity> {
    return await this.baseRepository.findOne(id);
  }

  public async update(id: number, updateBaseDto: UpdateDto): Promise<UpdateResult> {
    return await this.baseRepository.update(id, updateBaseDto as any);
  }

  public async remove(id: number): Promise<UpdateResult> {
    return this.baseRepository.softDelete(id);
  }
}
