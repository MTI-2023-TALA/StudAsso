import { CreateNewsDto, NewsDto, NewsWithAssoNameDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryPagination } from './api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiNewsFeedService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'news';
  }

  public create(newsFeed: CreateNewsDto): Observable<NewsDto> {
    return this.apiService.post<CreateNewsDto, NewsDto, undefined>(this.url, newsFeed);
  }

  public findAllWithAsso(query: QueryPagination = undefined): Observable<NewsDto[]> {
    return this.apiService.get<NewsDto[], QueryPagination>(`${this.url}/asso`, query);
  }

  public findAll(query: QueryPagination = undefined): Observable<NewsWithAssoNameDto[]> {
    return this.apiService.get<NewsWithAssoNameDto[], QueryPagination>(`${this.url}/assoWithAssoName`, query);
  }
}
