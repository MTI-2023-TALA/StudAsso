import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    return;
  }

  public get<TypeResult>(url: string): Observable<TypeResult> {
    const result = this.http.get<TypeResult>(`/api/${url}`);
    return result;
  }

  public post<TypePayload, TypeResult>(url: string, payload: TypePayload): Observable<TypeResult> {
    const result = this.http.post<TypeResult>(`/api/${url}`, payload);
    return result;
  }

  public patch<TypePayload, TypeResult>(url: string, payload: TypePayload): Observable<TypeResult> {
    const result = this.http.patch<TypeResult>(`/api/${url}`, payload);
    return result;
  }

  public delete<TypeResult>(url: string) {
    const result = this.http.delete<TypeResult>(`/api/${url}`);
    return result;
  }
}
