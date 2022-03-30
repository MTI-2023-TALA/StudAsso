import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontendApiModule } from '@stud-asso/frontend/api';
import { RouterModule } from '@angular/router';
import { FrontendSchoolCreateAssociationModule } from '@stud-asso/frontend/school/create-association';
import { FrontendTableModule } from '@stud-asso/frontend/table';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontendApiModule,
    RouterModule,
    FrontendSchoolCreateAssociationModule,
    FrontendTableModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
