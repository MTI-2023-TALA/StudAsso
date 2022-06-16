import { BaseModalComponent } from './base-modal/base-modal.component';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedFormlyModule, FrontendCoreI18nModule],
  declarations: [BaseModalComponent, FormModalComponent, ConfirmModalComponent],
})
export class FrontendSharedModalModule {}
