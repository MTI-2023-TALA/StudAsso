import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './members-list/members-list.component';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule],
  declarations: [MembersListComponent],
})
export class FrontendFeatureAssoMembersListModule {}
