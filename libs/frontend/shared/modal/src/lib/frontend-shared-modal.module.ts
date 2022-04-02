import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDirective } from './modal.directive';
import { BaseModalComponent } from './base-modal/base-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalDirective, BaseModalComponent],
  exports: [ModalDirective],
})
export class FrontendSharedModalModule {}
