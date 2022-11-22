import { CreateFundingDto, FundingDto, UpdateFundingDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryPagination } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiFundingService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'funding';
  }

  public createFunding(offer: CreateFundingDto): Observable<FundingDto> {
    return this.apiService.post<CreateFundingDto, FundingDto, undefined>(this.url, offer);
  }

  public findAll(query: QueryPagination = undefined): Observable<FundingDto[]> {
    return this.apiService.get<FundingDto[], QueryPagination>(this.url, query);
  }

  public findAllByAsso(query: QueryPagination = undefined): Observable<FundingDto[]> {
    return this.apiService.get<FundingDto[], QueryPagination>(`${this.url}/me`, query);
  }

  public find(id: number): Observable<FundingDto> {
    return this.apiService.get<FundingDto, undefined>(`${this.url}/${id}`);
  }

  public update(id: number, funding: UpdateFundingDto): Observable<FundingDto> {
    return this.apiService.put<UpdateFundingDto, FundingDto, undefined>(`${this.url}/${id}`, funding);
  }
}
