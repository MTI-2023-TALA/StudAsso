import { CommonModule } from '@angular/common';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedModalModule } from '@stud-asso/frontend-shared-modal';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedModalModule, FrontendCoreI18nModule],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
})
export class FrontendSharedLoginPageModule {}
