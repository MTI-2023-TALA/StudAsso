import { CommonModule } from '@angular/common';
import { FrontendSharedModalModule } from '@stud-asso/frontend-shared-modal';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedModalModule],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
})
export class FrontendSharedLoginPageModule {}
