import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { ToastExempleComponent } from './toast-exemple/toast-exemple.component';
import { ToastDirective } from './toast.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent, ToastExempleComponent, ToastDirective],
  exports: [ToastDirective],
})
export class FrontendToastModule {}
