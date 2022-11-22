import {
  AssociationOfferApplicationDto,
  AssociationOfferApplicationReviewDto,
  AssociationOfferDto,
  AssociationOfferWithAssoAndRoleDto,
  CreateAssociationOfferApplicationDto,
  CreateAssociationOfferDto,
} from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryPagination } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiOfferService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'association_offers';
  }

  public createApplication(offer: CreateAssociationOfferDto): Observable<AssociationOfferDto> {
    return this.apiService.post<CreateAssociationOfferDto, AssociationOfferDto, undefined>(this.url, offer);
  }

  public findAll(query: QueryPagination = undefined): Observable<AssociationOfferDto[]> {
    return this.apiService.get<AssociationOfferDto[], QueryPagination>(`${this.url}/stats`, query);
  }

  public findAllOffer(query: QueryPagination = undefined): Observable<AssociationOfferWithAssoAndRoleDto[]> {
    return this.apiService.get<AssociationOfferWithAssoAndRoleDto[], QueryPagination>(`${this.url}`, query);
  }

  public findAllOfferOfAsso(
    assoId: number,
    query: QueryPagination = undefined
  ): Observable<AssociationOfferWithAssoAndRoleDto[]> {
    return this.apiService.get<AssociationOfferWithAssoAndRoleDto[], QueryPagination>(
      `${this.url}/offers/${assoId}`,
      query
    );
  }

  public findAllApplication(query: QueryPagination = undefined): Observable<AssociationOfferApplicationReviewDto[]> {
    return this.apiService.get<AssociationOfferApplicationReviewDto[], QueryPagination>(
      `${this.url}/application`,
      query
    );
  }

  public findOneApplication(id: number): Observable<AssociationOfferApplicationReviewDto> {
    return this.apiService.get<AssociationOfferApplicationReviewDto, undefined>(`${this.url}/application/${id}`);
  }

  public removeApplication(id: number): Observable<AssociationOfferApplicationReviewDto> {
    return this.apiService.delete<AssociationOfferApplicationReviewDto>(`${this.url}/application/${id}`);
  }

  public postApplication(
    application: CreateAssociationOfferApplicationDto
  ): Observable<AssociationOfferApplicationDto> {
    return this.apiService.post<CreateAssociationOfferApplicationDto, AssociationOfferApplicationDto, undefined>(
      `${this.url}/application`,
      application
    );
  }
}
