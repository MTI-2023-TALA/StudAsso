import { BaseModalComponent } from './base-modal/base-modal.component';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';
import { FrontendSharedTagModule } from '@stud-asso/frontend-shared-tag';
import { LogsModalComponent } from './logs-modal/logs-modal.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedFormlyModule, FrontendCoreI18nModule, FrontendSharedTagModule],
  declarations: [BaseModalComponent, FormModalComponent, ConfirmModalComponent, LogsModalComponent],
})
export class FrontendSharedModalModule {}
