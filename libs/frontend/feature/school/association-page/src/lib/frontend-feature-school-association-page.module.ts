import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociationPageComponent } from './association-page/association-page.component';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule],
  declarations: [AssociationPageComponent],
})
export class FrontendFeatureSchoolAssociationPageModule {}
