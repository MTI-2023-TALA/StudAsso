import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/login',
  clientId: '386959472260-1fjblmdut78g3bvlhrgdifltrrm6om3g.apps.googleusercontent.com',
  scope: 'openid profile email',
  requestAccessToken: true,
};

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  user: any;
  accessToken: string;
  accessToken$ = new Subject<string>();

  constructor(private readonly oAuthService: OAuthService) {}

  public initGoogle(): void {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow({ customHashFragment: location.hash }).then(() => {
        if (this.oAuthService.hasValidIdToken()) {
          this.accessToken = this.oAuthService.getAccessToken();
          this.accessToken$.next(this.accessToken);
          this.oAuthService.loadUserProfile().then((user) => {
            this.user = user;
          });
        }
      });
    });
  }

  public signIn(): string | null {
    if (!this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.initImplicitFlow();
      return null;
    }
    return this.oAuthService.getAccessToken();
  }

  public async logout(): Promise<void> {
    this.oAuthService.logOut();
  }
}
