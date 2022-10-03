import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { FrontendSharedTagModule } from '@stud-asso/frontend-shared-tag';
import { NgModule } from '@angular/core';
import { RolePageComponent } from './role-page/role-page.component';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule, FrontendSharedTagModule, FrontendSharedGenericPageModule],
  declarations: [RolePageComponent],
})
export class FrontendFeatureAssociationRolePageModule {}
