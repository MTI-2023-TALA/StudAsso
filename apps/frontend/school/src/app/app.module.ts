import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontendLoginModule } from '@stud-asso/frontend/login';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FrontendLoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
