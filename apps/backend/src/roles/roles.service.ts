import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';
import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    super(roleRepository);
  }
}
