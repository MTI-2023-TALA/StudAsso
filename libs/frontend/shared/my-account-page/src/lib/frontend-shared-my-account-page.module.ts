import { CommonModule } from '@angular/common';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { MyAccountPageComponent } from './my-account-page/my-account-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendCoreI18nModule],
  declarations: [MyAccountPageComponent],
})
export class FrontendSharedMyAccountPageModule {}
