import { CommonModule } from '@angular/common';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { FrontendSharedTagsModule } from '@stud-asso/frontend/shared/tags';
import { NgModule } from '@angular/core';
import { RolePageComponent } from './role-page/role-page.component';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule, FrontendSharedTagsModule],
  declarations: [RolePageComponent],
})
export class FrontendFeatureAssociationRolePageModule {}
