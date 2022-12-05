import { CommonModule } from '@angular/common';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedLoaderModule } from '@stud-asso/frontend-shared-loader';
import { MyAccountPageComponent } from './my-account-page/my-account-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendCoreI18nModule, FrontendSharedLoaderModule],
  declarations: [MyAccountPageComponent],
})
export class FrontendSharedMyAccountPageModule {}
