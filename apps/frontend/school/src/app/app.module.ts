import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontendApiModule } from '@stud-asso/frontend/api';
import { RouterModule } from '@angular/router';
import { FrontendSchoolCreateAssociationModule } from '@stud-asso/frontend/school/create-association';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontendApiModule,
    RouterModule,
    FrontendSchoolCreateAssociationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
