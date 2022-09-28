import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { AssociationOffer } from '@prisma/client';
import { CreateAssociationOfferDto } from '@stud-asso/shared/dtos';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiOfferService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'association_offers';
  }

  public createApplication(offer: CreateAssociationOfferDto): Observable<AssociationOffer> {
    return this.apiService.post<CreateAssociationOfferDto, AssociationOffer>(this.url, offer);
  }

  public findAll(): Observable<AssociationOffer[]> {
    return this.apiService.get<AssociationOffer[]>(`${this.url}/stats`);
  }
}
