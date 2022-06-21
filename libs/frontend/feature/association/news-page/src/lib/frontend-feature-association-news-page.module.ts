import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { NewsPageComponent } from './news-page/news-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedGenericPageModule],
  declarations: [NewsPageComponent],
})
export class FrontendFeatureAssociationNewsPageModule {}
