import { AssociationDto, CreateRoleDto, RoleDto, UpdateRoleDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRoleService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'roles';
  }

  public create(role: CreateRoleDto): Observable<CreateRoleDto> {
    return this.apiService.post<CreateRoleDto, RoleDto>(this.url, role);
  }

  public update(id: number, role: UpdateRoleDto): Observable<RoleDto> {
    return this.apiService.patch<UpdateRoleDto, RoleDto>(`${this.url}/${id}`, role);
  }

  // TODO: Rework return type
  public remove(id: number): Observable<RoleDto> {
    return this.apiService.delete<RoleDto>(`${this.url}/${id}`);
  }

  public findAllRoleWithAsso(id: number): Observable<AssociationDto[]> {
    return this.apiService.get<AssociationDto[]>(`${this.url}/asso/${id}`);
  }
}
