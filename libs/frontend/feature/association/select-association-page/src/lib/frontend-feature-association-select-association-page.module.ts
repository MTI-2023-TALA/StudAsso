import { CommonModule } from '@angular/common';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { NgModule } from '@angular/core';
import { SelectionAssoPageComponent } from './selection-asso-page/selection-asso-page.component';

@NgModule({
  imports: [CommonModule, FrontendCoreI18nModule],
  declarations: [SelectionAssoPageComponent],
})
export class FrontendFeatureAssociationSelectAssociationPageModule {}
