import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingComponent } from './main-routing/main-routing.component';
import { RouterModule } from '@angular/router';
import { FrontendSharedNavbarModule } from '@stud-asso/frontend-shared-navbar';
import { FrontendSharedToastModule } from '@stud-asso/frontend-shared-toast';
import { FrontendSharedModalModule } from '@stud-asso/frontend-shared-modal';

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
