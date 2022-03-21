import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { FrontendNavbarModule } from '@stud-asso/frontend/navbar';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FrontendNavbarModule, RouterModule],
  declarations: [HomePageComponent],
})
export class FrontendSchoolHomePageModule {}
