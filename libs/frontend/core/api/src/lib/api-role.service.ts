import { AssociationDto, CreateRoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { ApiGenericService } from './api-generic.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRoleService extends ApiGenericService<CreateRoleDto, UpdateRoleDto> {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'roles';
  }

  public findAllRoleWithAsso(id: number): Observable<AssociationDto[]> {
    return this.apiService.get<AssociationDto[]>(`${this.url}/asso/${id}`);
  }
}
