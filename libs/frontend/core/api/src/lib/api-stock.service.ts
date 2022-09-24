import { CreateStockDto, StockDto, StockLogDto, StockLogWithUserDto, UpdateStockDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiStockService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'stocks';
  }

  public create(stock: CreateStockDto): Observable<StockDto> {
    return this.apiService.post<CreateStockDto, StockDto>(this.url, stock);
  }

  public update(id: number, stock: UpdateStockDto): Observable<StockDto> {
    return this.apiService.patch<UpdateStockDto, StockDto>(`${this.url}/${id}`, stock);
  }

  // TODO: Rework return type
  public remove(id: number): Observable<StockDto> {
    return this.apiService.delete<StockDto>(`${this.url}/${id}`);
  }

  public findAllStockWithAssoId(): Observable<StockDto[]> {
    return this.apiService.get<StockDto[]>(`${this.url}/asso`);
  }

  public findAllAssoStockLog(): Observable<StockLogWithUserDto[]> {
    return this.apiService.get<StockLogWithUserDto[]>(`${this.url}/assologs`);
  }

  public findSpecificStockLogs(stockId: number): Observable<StockLogDto[]> {
    return this.apiService.get<StockLogDto[]>(`${this.url}/logs/${stockId}`);
  }
}
