import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend-core-base';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '@stud-asso/backend/core/orm';

@Injectable()
export class RolesService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    super(roleRepository);
  }
}