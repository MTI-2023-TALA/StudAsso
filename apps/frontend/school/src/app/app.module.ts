import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FrontendCoreApiModule } from '@stud-asso/frontend-core-api';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { FrontendSharedTagsModule } from '@stud-asso/frontend/shared/tags';
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
    FrontendCoreI18nModule,
    FrontendSharedTableModule,
    FrontendSharedFormlyModule,
    FrontendSharedTooltipModule,
    FrontendSharedTagsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
