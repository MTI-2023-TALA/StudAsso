import { CreateFundingDto, FundingDto, UpdateFundingDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { AssociationOffer } from '@prisma/client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFundingService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'funding';
  }

  public createFunding(offer: CreateFundingDto): Observable<AssociationOffer> {
    return this.apiService.post<CreateFundingDto, AssociationOffer>(this.url, offer);
  }

  public findAll(): Observable<FundingDto[]> {
    return this.apiService.get<FundingDto[]>(`${this.url}`);
  }

  public find(id: number): Observable<FundingDto> {
    return this.apiService.get<FundingDto>(`${this.url}/${id}`);
  }

  public update(id: number, funding: UpdateFundingDto): Observable<FundingDto> {
    return this.apiService.put<UpdateFundingDto, FundingDto>(`${this.url}/${id}`, funding);
  }
}
