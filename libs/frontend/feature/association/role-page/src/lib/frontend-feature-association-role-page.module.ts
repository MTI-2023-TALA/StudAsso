import { CommonModule } from '@angular/common';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { NgModule } from '@angular/core';
import { RolePageComponent } from './role-page/role-page.component';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule],
  declarations: [RolePageComponent],
})
export class FrontendFeatureAssociationRolePageModule {}
