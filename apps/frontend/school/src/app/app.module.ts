import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FrontendCoreApiModule } from '@stud-asso/frontend-core-api';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
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
    FrontendSharedTableModule,
    FrontendSharedFormlyModule,
    FrontendSharedTooltipModule,
    FrontendSharedTagsModule,
    FrontendSharedGenericPageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
