import { AssociationPageComponent } from './association-page/association-page.component';
import { CommonModule } from '@angular/common';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { NgModule } from '@angular/core';
@NgModule({
  imports: [CommonModule, FrontendSharedTableModule],
  declarations: [AssociationPageComponent],
})
export class FrontendFeatureSchoolAssociationPageModule {}
