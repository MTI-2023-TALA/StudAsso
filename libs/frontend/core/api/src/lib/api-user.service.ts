import {
  AssociationAndRoleNameDto,
  AssociationOfUserDto,
  SimpleUserDto,
  UpdateUserFirstLastNameDto,
  UserIdAndEmailDto,
} from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryPagination } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'users';
  }

  getIdAndEmail(query: QueryPagination = undefined): Observable<UserIdAndEmailDto[]> {
    return this.apiService.get<UserIdAndEmailDto[], QueryPagination>(`${this.url}/idandemail`, query);
  }

  getUserAsso(): Observable<AssociationOfUserDto> {
    return this.apiService.get<AssociationOfUserDto, undefined>(`${this.url}/asso`);
  }

  getMe(): Observable<SimpleUserDto> {
    return this.apiService.get<SimpleUserDto, undefined>(`${this.url}/me`);
  }

  getMeAsso(query: QueryPagination = undefined): Observable<AssociationAndRoleNameDto[]> {
    return this.apiService.get<AssociationAndRoleNameDto[], QueryPagination>(`${this.url}/me/asso`, query);
  }

  updateMe(data: UpdateUserFirstLastNameDto) {
    return this.apiService.patch(`${this.url}/me`, data);
  }
}
