import {
  AssociationDto,
  AssociationMemberWithRoleDto,
  AssociationWithPresidentDto,
  AssociationsMemberDto,
  CreateAssociationDto,
  UpdateAssociationDto,
} from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryPagination } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiAssociationService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'associations';
  }

  public create(association: CreateAssociationDto): Observable<AssociationDto> {
    return this.apiService.post<CreateAssociationDto, AssociationDto, undefined>(this.url, association);
  }

  public update(id: number, association: UpdateAssociationDto): Observable<AssociationDto> {
    return this.apiService.patch<UpdateAssociationDto, AssociationDto, undefined>(`${this.url}/${id}`, association);
  }

  // TODO: Rework return type
  public remove(id: number): Observable<AssociationDto> {
    return this.apiService.delete<AssociationDto>(`${this.url}/${id}`);
  }

  public findAll(query: QueryPagination = undefined): Observable<AssociationWithPresidentDto[]> {
    return this.apiService.get<AssociationWithPresidentDto[], QueryPagination>(this.url, query);
  }

  public findOneWithPresident(id: number): Observable<AssociationWithPresidentDto> {
    return this.apiService.get<AssociationWithPresidentDto, undefined>(`${this.url}/${id}`);
  }

  public findMembers(query: QueryPagination = undefined): Observable<AssociationMemberWithRoleDto[]> {
    return this.apiService.get<AssociationMemberWithRoleDto[], QueryPagination>(`${this.url}/members`, query);
  }

  public deleteUserFromAsso(id: number): Observable<AssociationsMemberDto> {
    return this.apiService.delete<AssociationsMemberDto>(`${this.url}/member/${id}`);
  }
}
