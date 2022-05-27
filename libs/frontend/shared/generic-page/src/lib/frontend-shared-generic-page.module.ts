import { CommonModule } from '@angular/common';
import { FrontendSharedTableModule } from '@stud-asso/frontend-shared-table';
import { GenericPageComponent } from './generic-page/generic-page.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedTableModule],
  declarations: [GenericPageComponent],
  exports: [GenericPageComponent],
})
export class FrontendSharedGenericPageModule {}
