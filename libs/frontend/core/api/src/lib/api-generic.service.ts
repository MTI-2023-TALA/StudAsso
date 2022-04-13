import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiGenericService<CreatePayloadDto, UpdatePayloadDto> {
  protected url: string;

  constructor(private apiService: ApiService) {}

  public create(payload: CreatePayloadDto) {
    return this.apiService.post(`${this.url}`, payload);
  }

  public findAll() {
    return this.apiService.get(`${this.url}`);
  }

  public findOne(id: number) {
    return this.apiService.get(`${this.url}/${id}`);
  }

  public update(id: number, payload: UpdatePayloadDto) {
    return this.apiService.patch(`${this.url}/${id}`, payload);
  }

  public remove(id: number) {
    return this.apiService.delete(`${this.url}/${id}`);
  }
}
