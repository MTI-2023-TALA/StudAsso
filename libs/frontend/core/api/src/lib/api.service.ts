import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    return;
  }

  public get(url: string) {
    const result = this.http.get(`/api/${url}`);
    console.log(result);
    return result;
  }

  public post(url: string, payload: any) {
    const result = this.http.post(`/api/${url}`, payload);
    console.log(result);
    return result;
  }
}
