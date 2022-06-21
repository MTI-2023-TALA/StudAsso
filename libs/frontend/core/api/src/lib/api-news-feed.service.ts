import { CreateNewsFeedDto, NewsFeedDto } from '@stud-asso/shared/dtos';

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
    this.url = 'news-feed';
  }

  public create(newsFeed: CreateNewsFeedDto): Observable<NewsFeedDto> {
    return this.apiService.post<CreateNewsFeedDto, NewsFeedDto>(this.url, newsFeed);
  }

  public findAll(): Observable<NewsFeedDto[]> {
    return this.apiService.get<NewsFeedDto[]>(this.url);
  }
}
