import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingComponent } from './main-routing/main-routing.component';
import { RouterModule } from '@angular/router';
import { FrontendNavbarModule } from '@stud-asso/frontend/navbar';
import { FrontendToastModule } from '@stud-asso/frontend/toast';
import { FrontendModalModule } from '@stud-asso/frontend/modal';

@NgModule({
  imports: [
    CommonModule,
    FrontendNavbarModule,
    RouterModule,
    FrontendToastModule,
    FrontendModalModule,
  ],
  declarations: [MainRoutingComponent],
})
export class FrontendMainRoutingComponentModule {}
