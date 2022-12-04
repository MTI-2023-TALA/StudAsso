import {
  AddRoleToUserDto,
  AssociationsMemberDto,
  CreateRoleDto,
  RoleDto,
  RoleOnlyPermissionsDto,
  UpdateRoleDto,
} from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryPagination } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiRoleService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'roles';
  }

  public create(role: CreateRoleDto): Observable<CreateRoleDto> {
    return this.apiService.post<CreateRoleDto, RoleDto, undefined>(this.url, role);
  }

  public update(id: number, role: UpdateRoleDto): Observable<RoleDto> {
    return this.apiService.patch<UpdateRoleDto, RoleDto, undefined>(`${this.url}/${id}`, role);
  }

  public remove(id: number): Observable<RoleDto> {
    return this.apiService.delete<RoleDto>(`${this.url}/${id}`);
  }

  public findAllRoleWithAsso(query: QueryPagination = undefined): Observable<RoleDto[]> {
    return this.apiService.get<RoleDto[], QueryPagination>(`${this.url}/asso`, query);
  }

  public addRoleToUser(user: AddRoleToUserDto): Observable<AssociationsMemberDto> {
    return this.apiService.post<AddRoleToUserDto, AssociationsMemberDto, undefined>(`${this.url}/user`, user);
  }

  public updateUserRole(user: AddRoleToUserDto): Observable<AssociationsMemberDto> {
    return this.apiService.patch<AddRoleToUserDto, AssociationsMemberDto, undefined>(`${this.url}/user`, user);
  }

  public getMyPerms(query: QueryPagination = undefined): Observable<RoleOnlyPermissionsDto> {
    return this.apiService.get<RoleOnlyPermissionsDto, QueryPagination>(`${this.url}/permissions/me`, query);
  }
}
