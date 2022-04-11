import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FrontendCoreApiModule } from '@stud-asso/frontend-core-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FrontendCoreApiModule, RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}