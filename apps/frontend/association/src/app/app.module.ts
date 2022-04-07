import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontendCoreApiModule } from '@stud-asso/frontend-core-api';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FrontendCoreApiModule, FrontendSharedFormlyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
