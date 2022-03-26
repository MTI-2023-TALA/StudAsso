import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { ToastExempleComponent } from './toast-exemple/toast-exemple.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastComponent, ToastExempleComponent],
})
export class FrontendToastModule {}
