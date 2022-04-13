import { CommonModule } from '@angular/common';
import { FrontendSharedModalModule } from '@stud-asso/frontend-shared-modal';
import { FrontendSharedNavbarModule } from '@stud-asso/frontend-shared-navbar';
import { FrontendSharedToastModule } from '@stud-asso/frontend-shared-toast';
import { MainRoutingComponent } from './main-routing/main-routing.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FrontendSharedNavbarModule,
    RouterModule,
    FrontendSharedToastModule,
    FrontendSharedModalModule,
  ],
  declarations: [MainRoutingComponent],
})
export class FrontendSharedMainRoutingComponentModule {}
