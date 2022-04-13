import { BaseModalComponent } from './base-modal/base-modal.component';
import { CommonModule } from '@angular/common';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';
import { ModalDirective } from './modal.directive';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedFormlyModule],
  declarations: [ModalDirective, BaseModalComponent, FormModalComponent],
  exports: [ModalDirective],
})
export class FrontendSharedModalModule {}
