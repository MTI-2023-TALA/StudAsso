import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  imports: [CommonModule, BrowserModule, HttpClientModule, OAuthModule.forRoot()],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class FrontendCoreApiModule {}
