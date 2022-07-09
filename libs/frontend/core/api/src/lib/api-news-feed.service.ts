import { CreateNewsDto, NewsDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiNewsFeedService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'news';
  }

  public create(newsFeed: CreateNewsDto): Observable<NewsDto> {
    return this.apiService.post<CreateNewsDto, NewsDto>(this.url, newsFeed);
  }

  public findAll(): Observable<NewsDto[]> {
    return this.apiService.get<NewsDto[]>(this.url);
  }
}
