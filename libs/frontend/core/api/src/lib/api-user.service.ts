import { AssociationOfUserDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';

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
}
