import { CommonModule } from '@angular/common';
import { EventPageComponent } from './event-page/event-page.component';
import { FrontendSharedGenericPageModule } from '@stud-asso/frontend/shared/generic-page';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedGenericPageModule],
  declarations: [EventPageComponent],
})
export class FrontendFeatureAssociationEventPageModule {}
