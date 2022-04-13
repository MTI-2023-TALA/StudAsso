import { CommonModule } from '@angular/common';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { ToastDirective } from './toast.directive';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule],
  declarations: [ToastComponent, ToastDirective],
  exports: [ToastDirective],
})
export class FrontendSharedToastModule {}
