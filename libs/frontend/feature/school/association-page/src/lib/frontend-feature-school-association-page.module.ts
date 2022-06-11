import { AssociationPageComponent } from './association-page/association-page.component';
import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { FrontendSharedSpinnerModule } from '@stud-asso/frontend/shared/spinner';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule, FrontendSharedGenericPageModule, FrontendSharedSpinnerModule],
  declarations: [AssociationPageComponent],
})
export class FrontendFeatureSchoolAssociationPageModule {}
