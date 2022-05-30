import { AssociationDto, CreateAssociationDto, UpdateAssociationDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAssociationService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'associations';
  }

  public create(association: CreateAssociationDto): Observable<AssociationDto> {
    return this.apiService.post<CreateAssociationDto, AssociationDto>(this.url, association);
  }

  public update(id: number, association: UpdateAssociationDto): Observable<AssociationDto> {
    return this.apiService.patch<UpdateAssociationDto, AssociationDto>(`${this.url}/${id}`, association);
  }

  // TODO: Rework return type
  public remove(id: number): Observable<AssociationDto> {
    return this.apiService.delete<AssociationDto>(`${this.url}/${id}`);
  }

  public findAll(): Observable<AssociationDto[]> {
    return this.apiService.get<AssociationDto[]>(this.url);
  }
}
