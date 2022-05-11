import { I18nPipe } from './i18n.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [I18nPipe],
  exports: [I18nPipe],
  providers: [I18nPipe],
})
export class FrontendCoreI18nModule {}
