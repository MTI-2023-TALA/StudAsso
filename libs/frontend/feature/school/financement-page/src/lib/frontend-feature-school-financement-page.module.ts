import { CommonModule } from '@angular/common';
import { FinancementPageComponent } from './financement-page/financement-page.component';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedGenericPageModule],
  declarations: [FinancementPageComponent],
})
export class FrontendFeatureSchoolFinancementPageModule {}
