import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { BaseService } from '@stud-asso/backend-core-base';
import { Injectable } from '@nestjs/common';
import { Role } from '@stud-asso/backend/core/orm';
import { RoleRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class RolesService extends BaseService<Role, CreateRoleDto, UpdateRoleDto> {
  constructor(private readonly roleRepository: RoleRepository) {
    super(roleRepository);
  }
}
