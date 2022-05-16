import { CreateStockDto, StockDto, UpdateStockDto } from '@stud-asso/shared/dtos';

import { ApiGenericService } from './api-generic.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiStockService extends ApiGenericService<CreateStockDto, UpdateStockDto> {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'stocks';
  }

  public findAllAsso(id: number): Observable<StockDto[]> {
    return this.apiService.get(`${this.url}/asso/${id}`);
  }
}
