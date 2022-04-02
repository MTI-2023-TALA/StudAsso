import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDirective } from './modal.directive';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';

@NgModule({
  imports: [CommonModule, FrontendSharedFormlyModule],
  declarations: [ModalDirective, BaseModalComponent, FormModalComponent],
  exports: [ModalDirective],
})
export class FrontendSharedModalModule {}
