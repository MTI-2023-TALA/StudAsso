import { FrontendSharedGenericPageModule, GenericPageComponent } from '@stud-asso/frontend/shared/generic-page';

import { CommonModule } from '@angular/common';
import { FinancementPageComponent } from './financement-page/financement-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedGenericPageModule],
  declarations: [FinancementPageComponent],
})
export class FrontendFeatureAssociationFinancementPageModule {}
