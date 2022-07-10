import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { MemberPageComponent } from './member-page/member-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedGenericPageModule],
  declarations: [MemberPageComponent],
})
export class FrontendFeatureAssociationMemberPageModule {}
