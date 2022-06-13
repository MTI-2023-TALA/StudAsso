import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FrontendCoreApiModule } from '@stud-asso/frontend-core-api';
import { FrontendSharedModalModule } from '@stud-asso/frontend-shared-modal';
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
    FrontendSharedTooltipModule,
    FrontendSharedModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
