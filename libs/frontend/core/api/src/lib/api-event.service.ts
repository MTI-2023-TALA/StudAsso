import { CreateEventDto, EventDto, UpdateEventDto } from '@stud-asso/shared/dtos';

import { ApiBaseService } from './api-base.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEventService extends ApiBaseService {
  constructor(apiService: ApiService) {
    super(apiService);
    this.url = 'events';
  }

  public create(event: CreateEventDto): Observable<EventDto> {
    return this.apiService.post<CreateEventDto, EventDto>(this.url, event);
  }

  public remove(id: number): Observable<EventDto> {
    return this.apiService.delete<EventDto>(`${this.url}/${id}`);
  }

  public update(id: number, event: UpdateEventDto): Observable<EventDto> {
    return this.apiService.patch<UpdateEventDto, EventDto>(`${this.url}/${id}`, event);
  }

  public findAll(): Observable<EventDto[]> {
    return this.apiService.get<EventDto[]>(this.url);
  }
}
