import { AuthDto, TokenDto } from '@stud-asso/shared/dtos';
import { UseStorage, getData, removeData, setData } from '@stud-asso/frontend-core-storage';
import { catchError, throwError } from 'rxjs';

import { ApiAuthService } from '@stud-asso/frontend-core-api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

interface rtJwt {
  exp: number;
  iat: number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isConnected = false;
  public refreshId: NodeJS.Timer;
  @UseStorage('jwt-token') private jwt: string | null;
  @UseStorage('refresh-token') private refreshToken: string | null;

  constructor(private apiAuthService: ApiAuthService, private router: Router) {
    this.isConnected = this.isSignIn();
  }

  public refreshTokenPeriodically() {
    this.refreshId = setInterval(() => {
      console.log('Hello !');
      this.refresh();
    }, 1000 * 60 * 14);
  }

  public isSignIn(): boolean {
    if (this.refreshToken) {
      const rtJwt: rtJwt = jwt_decode(this.refreshToken);
      if (rtJwt.exp > Date.now()) {
        this.reset();
        return false;
      }

      this.refreshTokenPeriodically();
      this.refresh();
      return true;
    }

    return false;
  }

  public tryToSignUp(email: string, password: string, association: boolean = false) {
    const payload: AuthDto = { email, password };
    this.apiAuthService.signupLocal(payload).subscribe((res: TokenDto) => {
      this.jwt = res.accessToken;
      this.refreshToken = res.refreshToken;
      this.isConnected = true;
      this.refreshTokenPeriodically();
      if (association) this.router.navigateByUrl('/select-asso');
      else this.router.navigateByUrl('/');
    });
  }

  public tryToSign(email: string, password: string, association: boolean = false) {
    const payload: AuthDto = { email, password };
    this.apiAuthService.signinLocal(payload).subscribe((res: TokenDto) => {
      this.jwt = res.accessToken;
      this.refreshToken = res.refreshToken;
      this.isConnected = true;
      if (association) this.router.navigateByUrl('/select-asso');
      else this.router.navigateByUrl('/');
    });
  }

  public isSign(): boolean {
    return this.isConnected && getData('jwt-token') !== null;
  }

  public logout() {
    this.reset();
    this.apiAuthService.logout().subscribe();
    this.router.navigateByUrl('/');
  }

  public reset() {
    removeData('jwt-token');
    removeData('refresh-token');
    window.clearInterval(this.refreshId);
    this.isConnected = false;
  }

  public refresh() {
    this.apiAuthService
      .refreshToken()
      .pipe(
        catchError((err) => {
          console.log('Test');
          this.logout();
          return throwError(err);
        })
      )
      .subscribe((res: TokenDto) => {
        setData('jwt-token', res.accessToken);
        setData('refresh-token', res.refreshToken);
        this.jwt = res.accessToken;
        this.refreshToken = res.refreshToken;
      });
  }
}
