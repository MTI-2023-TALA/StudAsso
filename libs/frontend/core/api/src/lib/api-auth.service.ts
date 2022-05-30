import { AuthDto, TokenDto } from '@stud-asso/shared/dtos';

import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  protected url: string;

  constructor(private apiService: ApiService) {
    this.url = 'auth';
  }

  public signupLocal(payload: AuthDto): Observable<TokenDto> {
    return this.apiService.post<AuthDto, TokenDto>(`${this.url}/local/signup`, payload);
  }

  public signinLocal(payload: AuthDto): Observable<TokenDto> {
    return this.apiService.post<AuthDto, TokenDto>(`${this.url}/local/signin`, payload);
  }

  public logout(): Observable<boolean> {
    return this.apiService.post<Record<string, never>, boolean>(`${this.url}/logout`, {});
  }

  public refreshToken(): Observable<TokenDto> {
    return this.apiService.post<Record<string, never>, TokenDto>(`${this.url}/refresh`, {});
  }
}
