import { CreateStockDto, UpdateStockDto } from '@stud-asso/shared/dtos';

import { ApiGenericService } from './api-generic.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiStockService extends ApiGenericService<CreateStockDto, UpdateStockDto> {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'stocks';
  }
}
