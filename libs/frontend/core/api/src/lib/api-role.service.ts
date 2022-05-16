import { CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { ApiGenericService } from './api-generic.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiRoleService extends ApiGenericService<CreateRoleDto, UpdateRoleDto> {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'roles';
  }

  public findAllAsso(id: number) {
    return this.apiService.get(`${this.url}/asso/${id}`);
  }
}
