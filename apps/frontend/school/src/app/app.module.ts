import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontendApiModule } from '@stud-asso/frontend/api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FrontendApiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
