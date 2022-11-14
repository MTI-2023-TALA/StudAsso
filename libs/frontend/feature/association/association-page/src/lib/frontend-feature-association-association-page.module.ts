import { AssociationPageComponent } from './association-page/association-page.component';
import { CommonModule } from '@angular/common';
import { FrontendSharedLoaderModule } from '@stud-asso/frontend-shared-loader';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedLoaderModule],
  declarations: [AssociationPageComponent],
})
export class FrontendFeatureAssociationAssociationPageModule {}
