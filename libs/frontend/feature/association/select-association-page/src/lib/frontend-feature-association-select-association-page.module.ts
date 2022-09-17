import { CommonModule } from '@angular/common';
import { FrontendCoreI18nModule } from '@stud-asso/frontend/core/i18n';
import { FrontendSharedLoaderModule } from '@stud-asso/frontend-shared-loader';
import { NgModule } from '@angular/core';
import { SelectionAssoPageComponent } from './selection-asso-page/selection-asso-page.component';

@NgModule({
  imports: [CommonModule, FrontendCoreI18nModule, FrontendSharedLoaderModule],
  declarations: [SelectionAssoPageComponent],
})
export class FrontendFeatureAssociationSelectAssociationPageModule {}
