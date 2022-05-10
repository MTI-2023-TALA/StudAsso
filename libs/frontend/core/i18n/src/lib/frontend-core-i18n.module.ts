import { CommonModule } from '@angular/common';
import { I18nPipe } from './i18n.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [I18nPipe],
  exports: [I18nPipe],
})
export class FrontendCoreI18nModule {}
