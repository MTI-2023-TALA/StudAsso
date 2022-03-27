import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingComponent } from './main-routing/main-routing.component';
import { RouterModule } from '@angular/router';
import { FrontendNavbarModule } from '@stud-asso/frontend/navbar';
import { FrontendToastModule } from '@stud-asso/frontend/toast';

@NgModule({
  imports: [
    CommonModule,
    FrontendNavbarModule,
    RouterModule,
    FrontendToastModule,
  ],
  declarations: [MainRoutingComponent],
})
export class FrontendMainRoutingComponentModule {}
