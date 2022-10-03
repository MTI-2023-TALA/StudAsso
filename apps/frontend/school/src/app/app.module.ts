import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FrontendCoreApiModule } from '@stud-asso/frontend-core-api';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { FrontendSharedModalModule } from '@stud-asso/frontend-shared-modal';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { FrontendSharedTagModule } from '@stud-asso/frontend-shared-tag';
import { FrontendSharedTooltipModule } from '@stud-asso/frontend/shared/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontendCoreApiModule,
    RouterModule,
    FrontendSharedTableModule,
    FrontendSharedFormlyModule,
    FrontendSharedTooltipModule,
    FrontendSharedTagModule,
    FrontendSharedGenericPageModule,
    FrontendSharedModalModule,
    FrontendCoreI18nModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
