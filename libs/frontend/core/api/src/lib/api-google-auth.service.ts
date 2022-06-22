import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { Injectable } from '@angular/core';

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

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow({ customHashFragment: location.hash }).then(() => {
        if (oAuthService.hasValidIdToken()) {
          this.accessToken = oAuthService.getAccessToken();
          oAuthService.loadUserProfile().then((user) => {
            this.user = user;
            console.log(user);
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
    const accessToken = this.oAuthService.getAccessToken();
    return accessToken;
  }

  public async logout(): Promise<void> {
    this.oAuthService.logOut();
  }
}
