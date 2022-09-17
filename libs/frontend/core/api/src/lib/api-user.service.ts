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

@Injectable({
  providedIn: 'root',
})
export class ApiUserService extends ApiBaseService {
  private api: ApiService;
  constructor(apiService: ApiService) {
    super(apiService);
    this.api = apiService;
    this.url = 'users';
  }

  getIdAndEmail(): Observable<UserIdAndEmailDto[]> {
    return this.api.get<UserIdAndEmailDto[]>(`${this.url}/idandemail`);
  }

  getUserAsso(): Observable<AssociationOfUserDto> {
    return this.api.get<AssociationOfUserDto>(`${this.url}/asso`);
  }

  getMe(): Observable<SimpleUserDto> {
    return this.api.get<SimpleUserDto>(`${this.url}/me`);
  }

  getMeAsso(): Observable<AssociationAndRoleNameDto[]> {
    return this.api.get<AssociationAndRoleNameDto[]>(`${this.url}/me/asso`);
  }

  updateMe(data: UpdateUserFirstLastNameDto) {
    return this.api.patch(`${this.url}/me`, data);
  }
}
