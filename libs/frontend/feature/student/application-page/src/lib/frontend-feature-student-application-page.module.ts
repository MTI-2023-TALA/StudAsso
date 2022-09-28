import { ApplicationPageComponent } from './application-page/application-page.component';
import { CommonModule } from '@angular/common';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedGenericPageModule],
  declarations: [ApplicationPageComponent],
})
export class FrontendFeatureStudentApplicationPageModule {}
