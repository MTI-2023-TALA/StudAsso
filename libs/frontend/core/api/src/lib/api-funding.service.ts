import {
  CreateFundingDto,
  FundingDto,
  OptionStatFundingDto,
  StatFundingDto,
  UpdateFundingDto,
} from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { AssociationOffer } from '@prisma/client';
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

  public createFunding(offer: CreateFundingDto): Observable<AssociationOffer> {
    return this.apiService.post<CreateFundingDto, AssociationOffer, undefined>(this.url, offer);
  }

  public findAll(query: QueryPagination = undefined): Observable<FundingDto[]> {
    return this.apiService.get<FundingDto[], QueryPagination>(`${this.url}`, query);
  }

  public find(id: number): Observable<FundingDto> {
    return this.apiService.get<FundingDto, undefined>(`${this.url}/${id}`);
  }

  public update(id: number, funding: UpdateFundingDto): Observable<FundingDto> {
    return this.apiService.put<UpdateFundingDto, FundingDto, undefined>(`${this.url}/${id}`, funding);
  }

  public getStats(option: OptionStatFundingDto): Observable<StatFundingDto> {
    return this.apiService.put<OptionStatFundingDto, StatFundingDto, undefined>(`${this.url}/stats`, option);
  }
}
