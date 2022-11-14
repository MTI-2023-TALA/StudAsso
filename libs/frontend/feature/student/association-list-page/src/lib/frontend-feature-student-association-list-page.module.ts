import { AssociationListPageComponent } from './association-list-page/association-list-page.component';
import { AssociationPageComponent } from './association-page/association-page.component';
import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, FrontendSharedGenericPageModule],
  declarations: [AssociationListPageComponent, AssociationPageComponent],
})
export class FrontendFeatureStudentAssociationListPageModule {}
