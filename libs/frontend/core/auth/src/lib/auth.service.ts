import { ApiAuthService, GoogleApiService } from '@stud-asso/frontend-core-api';
import { AppName, LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { AuthDto, CreateAccountDto, TokenDto } from '@stud-asso/shared/dtos';
import { catchError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

interface RtJWT {
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isConnected = false;
  private refreshId: NodeJS.Timer;
  private jwt: string | null;
  private refreshToken: string | null;

  constructor(
    private apiAuthService: ApiAuthService,
    private readonly google: GoogleApiService,
    private router: Router
  ) {
    this.jwt = LocalStorageHelper.getData(LocalStorageKey.JWT_TOKEN);
    this.refreshToken = LocalStorageHelper.getData(LocalStorageKey.REFRESH_TOKEN);
    this.isConnected = this.isSignIn();
  }

  public refreshTokenPeriodically() {
    this.refreshId = setInterval(() => {
      this.refresh();
    }, this._minToMs(14));
  }

  public isSignIn(): boolean {
    if (this.refreshToken) {
      const rtJwt: RtJWT = jwt_decode(this.refreshToken);
      // Token expired
      if (rtJwt.exp > Date.now()) {
        this.reset();
        this.google.initGoogle();
        return false;
      }

      // Token not expired - Regenering token
      this.refreshTokenPeriodically();
      this.refresh();
      return true;
    }

    this.google.initGoogle();
    return false;
  }

  public tryToSignUp(email: string, password: string, firstname: string, lastname: string) {
    const payload: CreateAccountDto = { email, password, firstname, lastname };
    this.apiAuthService.signupLocal(payload).subscribe((res: TokenDto) => {
      this.setToken(res);
      this.refreshTokenPeriodically();
      this.redirectAfterSucessfullLogin();
    });
  }

  public tryToSign(email: string, password: string) {
    const payload: AuthDto = { email, password };
    return this.apiAuthService.signinLocal(payload);
  }

  public tryToSignInWithGoogle(accessToken: string) {
    const payload = { token: accessToken };
    return this.apiAuthService.signinWithGoogle(payload);
  }

  public isSign(): boolean {
    return this.isConnected && LocalStorageHelper.getData(LocalStorageKey.JWT_TOKEN) !== null;
  }

  public logout() {
    this.reset();
    this.apiAuthService.logout().subscribe();
    this.google.logout();
    this.router.navigateByUrl('/login');
  }

  public setToken(res: TokenDto) {
    this.jwt = res.accessToken;
    LocalStorageHelper.setData(LocalStorageKey.JWT_TOKEN, this.jwt);
    this.refreshToken = res.refreshToken;
    LocalStorageHelper.setData(LocalStorageKey.REFRESH_TOKEN, this.refreshToken);
    this.isConnected = true;
  }

  public redirectAfterSucessfullLogin() {
    const appName = LocalStorageHelper.getData(LocalStorageKey.APP_NAME);
    if (appName === AppName.ASSOCIATION) this.router.navigateByUrl('/select-asso');
    else if (appName === AppName.STUDENT) this.router.navigateByUrl('/news');
    else this.router.navigateByUrl('/');
  }

  private reset() {
    LocalStorageHelper.removeData(LocalStorageKey.JWT_TOKEN);
    LocalStorageHelper.removeData(LocalStorageKey.REFRESH_TOKEN);
    LocalStorageHelper.removeData(LocalStorageKey.PERMISSIONS);
    window.clearInterval(this.refreshId);
    this.isConnected = false;
  }

  private refresh() {
    const assoId = LocalStorageHelper.getData<number>(LocalStorageKey.ASSOCIATION_ID);
    if (assoId) {
      this.apiAuthService
        .refreshTokenWithAssoId({ assoId })
        .pipe(
          catchError((err) => {
            this.logout();
            return throwError(() => err);
          })
        )
        .subscribe(this.setToken);
    } else {
      this.apiAuthService
        .refreshToken()
        .pipe(
          catchError((err) => {
            this.logout();
            return throwError(() => err);
          })
        )
        .subscribe(this.setToken);
    }
  }

  private _minToMs(min: number): number {
    return min * 60 * 1000;
  }
}
