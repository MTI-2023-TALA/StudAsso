import { UpdateResult, DeleteResult } from 'typeorm';

export interface IbaseService<Entity, CreateDto, UpdateDto> {
    create(entity: CreateDto): Promise<Entity>;
    findAll(): Promise<Entity[]>;
    findOne(id: number): Promise<Entity>;
    update(id: number, entity: UpdateDto) : Promise<UpdateResult>;
    remove(id: number) : Promise<DeleteResult>;
}
