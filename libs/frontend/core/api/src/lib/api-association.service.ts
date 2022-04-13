import { CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';

import { ApiGenericService } from './api-generic.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiAssociationService extends ApiGenericService<CreateAssociationDto, UpdateAssociationDto> {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'associations';
  }
}
