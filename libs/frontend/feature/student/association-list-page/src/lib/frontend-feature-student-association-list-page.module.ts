import { AssociationListPageComponent } from './association-list-page/association-list-page.component';
import { AssociationPageComponent } from './association-page/association-page.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AssociationListPageComponent, AssociationPageComponent],
})
export class FrontendFeatureStudentAssociationListPageModule {}
