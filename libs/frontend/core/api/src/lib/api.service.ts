import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    return;
  }

  private getHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${localStorage.getItem('jwt-token')}`);
    return headers;
  }

  public get<TypeResult>(url: string) {
    return this.http.get<TypeResult>(`/api/${url}`);
  }

  public post<TypePayload, TypeResult>(url: string, payload: TypePayload): Observable<TypeResult> {
    return this.http.post<TypeResult>(`/api/${url}`, payload);
  }

  public patch<TypePayload, TypeResult>(url: string, payload: TypePayload): Observable<TypeResult> {
    return this.http.patch<TypeResult>(`/api/${url}`, payload);
  }

  public delete<TypeResult>(url: string) {
    return this.http.delete<TypeResult>(`/api/${url}`);
  }
}
