import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend/utils/base';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    super(roleRepository);
  }
}
