import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FrontendCoreApiModule } from '@stud-asso/frontend-core-api';
import { RouterModule } from '@angular/router';
import { FrontendFeatureSchoolCreateAssociationModule } from '@stud-asso/frontend-feature-school-create-association';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontendCoreApiModule,
    RouterModule,
    FrontendFeatureSchoolCreateAssociationModule,
    FrontendSharedTableModule,
    FrontendSharedFormlyModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
