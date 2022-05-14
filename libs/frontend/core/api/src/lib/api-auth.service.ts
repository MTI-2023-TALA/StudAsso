import { ApiService } from './api.service';
import { AuthDto } from '@stud-asso/shared/dtos';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  protected url: string;

  constructor(private apiService: ApiService) {
    this.url = 'auth';
  }

  public signupLocal(payload: AuthDto) {
    return this.apiService.post(`${this.url}/local/signup`, payload);
  }

  public signinLocal(payload: AuthDto) {
    return this.apiService.post(`${this.url}/local/signin`, payload);
  }

  public logout() {
    return this.apiService.post(`${this.url}/logout`, {});
  }

  public refreshToken() {
    return this.apiService.post(`${this.url}/refresh`, {});
  }
}
