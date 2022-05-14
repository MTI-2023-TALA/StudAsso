import { CreateUserDto, UpdateUserDto } from '@stud-asso/shared/dtos';

import { ApiGenericService } from './api-generic.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService extends ApiGenericService<CreateUserDto, UpdateUserDto> {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'users';
  }

  getEmailAndId() {
    return [{ email: 'alois le bg', id: 666 }];
  }
}
