import { CreateStockDto, StockDto, StockLogDto, StockLogWithUserDto, UpdateStockDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryPagination } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiStockService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'stocks';
  }

  public create(stock: CreateStockDto): Observable<StockDto> {
    return this.apiService.post<CreateStockDto, StockDto, undefined>(this.url, stock);
  }

  public update(id: number, stock: UpdateStockDto): Observable<StockDto> {
    return this.apiService.patch<UpdateStockDto, StockDto, undefined>(`${this.url}/${id}`, stock);
  }

  public remove(id: number): Observable<StockDto> {
    return this.apiService.delete<StockDto>(`${this.url}/${id}`);
  }

  public findAllStockWithAssoId(query: QueryPagination): Observable<StockDto[]> {
    return this.apiService.get<StockDto[], QueryPagination>(`${this.url}/asso`, query);
  }

  public findAllAssoStockLog(query: QueryPagination = undefined): Observable<StockLogWithUserDto[]> {
    return this.apiService.get<StockLogWithUserDto[], QueryPagination>(`${this.url}/assologs`, query);
  }

  public findSpecificStockLogs(stockId: number, query: QueryPagination = undefined): Observable<StockLogDto[]> {
    return this.apiService.get<StockLogDto[], QueryPagination>(`${this.url}/logs/${stockId}`, query);
  }
}
