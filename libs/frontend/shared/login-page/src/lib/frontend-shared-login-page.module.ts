import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
})
export class FrontendSharedLoginPageModule {}
