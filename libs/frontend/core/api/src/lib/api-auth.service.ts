import { AssoIdOfUserDto, AuthDto, CreateAccountDto, GoogleAuthDto, TokenDto } from '@stud-asso/shared/dtos';

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

  public signupLocal(payload: CreateAccountDto): Observable<TokenDto> {
    return this.apiService.post<CreateAccountDto, TokenDto, undefined>(`${this.url}/local/signup`, payload);
  }

  public signinLocal(payload: AuthDto): Observable<TokenDto> {
    return this.apiService.post<AuthDto, TokenDto, undefined>(`${this.url}/local/signin`, payload);
  }

  public signinWithGoogle(payload: GoogleAuthDto): Observable<TokenDto> {
    return this.apiService.post<GoogleAuthDto, TokenDto, undefined>(`${this.url}/google/login`, payload);
  }

  public logout(): Observable<boolean> {
    return this.apiService.post<Record<string, never>, boolean, undefined>(`${this.url}/logout`, {});
  }

  public refreshToken(): Observable<TokenDto> {
    return this.apiService.post<Record<string, never>, TokenDto, undefined>(`${this.url}/refresh`, {});
  }

  public refreshTokenWithAssoId(payload: AssoIdOfUserDto): Observable<TokenDto> {
    return this.apiService.post<AssoIdOfUserDto, TokenDto, undefined>(`${this.url}/local/refreshWithAssoId`, payload);
  }
}
