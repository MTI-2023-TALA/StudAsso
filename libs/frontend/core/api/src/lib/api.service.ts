import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    return;
  }

  public get<TypeResult, QueryType>(url: string, queryParam: QueryType | undefined = undefined) {
    const queryParamCorrectType = queryParam as HttpParams;
    return this.http.get<TypeResult>(`/api/${url}`, { params: queryParamCorrectType });
  }

  public post<TypePayload, TypeResult, QueryType>(
    url: string,
    payload: TypePayload,
    queryParam: QueryType | undefined = undefined
  ): Observable<TypeResult> {
    const queryParamCorrectType = queryParam as HttpParams;
    console.log('Test');
    return this.http.post<TypeResult>(`/api/${url}`, payload, { params: queryParamCorrectType });
  }

  public patch<TypePayload, TypeResult, QueryType>(
    url: string,
    payload: TypePayload,
    queryParam: QueryType | undefined = undefined
  ): Observable<TypeResult> {
    const queryParamCorrectType = queryParam as HttpParams;
    return this.http.patch<TypeResult>(`/api/${url}`, payload, { params: queryParamCorrectType });
  }

  public put<TypePayload, TypeResult, QueryType>(
    url: string,
    payload: TypePayload,
    queryParam: QueryType | undefined = undefined
  ): Observable<TypeResult> {
    const queryParamCorrectType = queryParam as HttpParams;
    return this.http.put<TypeResult>(`/api/${url}`, payload, { params: queryParamCorrectType });
  }

  public delete<TypeResult>(url: string) {
    return this.http.delete<TypeResult>(`/api/${url}`);
  }
}
