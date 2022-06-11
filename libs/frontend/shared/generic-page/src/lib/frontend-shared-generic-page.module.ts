import { CommonModule } from '@angular/common';
import { FrontendSharedSpinnerModule } from '@stud-asso/frontend/shared/spinner';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { GenericPageComponent } from './generic-page/generic-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule, FrontendSharedSpinnerModule],
  declarations: [GenericPageComponent],
  exports: [GenericPageComponent],
})
export class FrontendSharedGenericPageModule {}
