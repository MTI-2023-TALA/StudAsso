import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontendNavbarModule } from '@stud-asso/frontend/navbar';
import { RouterModule } from '@angular/router';
import { FrontendToastModule, ToastDirective } from '@stud-asso/frontend/toast';

@NgModule({
  imports: [
    CommonModule,
    FrontendNavbarModule,
    RouterModule,
    FrontendToastModule,
  ],
  declarations: [HomePageComponent, ToastDirective],
})
export class FrontendSchoolHomePageModule {}
