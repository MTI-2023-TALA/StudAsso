import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast/toast.component';
import { ToastDirective } from './toast.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent, ToastDirective],
  exports: [ToastDirective],
})
export class FrontendSharedToastModule {}
