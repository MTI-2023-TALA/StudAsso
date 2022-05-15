import { AuthDto, TokenDto } from '@stud-asso/shared/dtos';
import { UseStorage, getData } from '@stud-asso/frontend-core-storage';

import { ApiAuthService } from '@stud-asso/frontend-core-api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isConnected = false;
  @UseStorage('jwt-token') private jwt: string | null;
  @UseStorage('refresh-token') private refreshToken: string | null;

  constructor(private apiAuthService: ApiAuthService, private router: Router) {
    this.isConnected = this.isSignIn();
  }

  public isSignIn(): boolean {
    if (this.jwt) {
      return true;
    } else {
      return false;
    }
  }

  public tryToSignUp(email: string, password: string) {
    const payload: AuthDto = { email, password };
    this.apiAuthService.signupLocal(payload).subscribe((res: TokenDto) => {
      this.jwt = res.accessToken;
      this.refreshToken = res.refreshToken;
      this.isConnected = true;
      this.router.navigateByUrl('/');
    });
  }

  public tryToSign(email: string, password: string) {
    const payload: AuthDto = { email, password };
    this.apiAuthService.signinLocal(payload).subscribe((res: TokenDto) => {
      this.jwt = res.accessToken;
      this.refreshToken = res.refreshToken;
      this.isConnected = true;
      this.router.navigateByUrl('/');
    });
  }

  public isSign(): boolean {
    return this.isConnected && getData('jwt-token') !== null;
  }

  public logout() {
    console.log('Logout');
    this.jwt = null;
    this.refreshToken = null;
    this.isConnected = false;
    this.apiAuthService.logout().subscribe();
    this.router.navigateByUrl('/');
  }
}
