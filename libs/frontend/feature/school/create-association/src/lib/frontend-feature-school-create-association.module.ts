import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCreateAssociationComponent } from './modal-create-association/modal-create-association.component';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';

@NgModule({
  imports: [CommonModule, FrontendSharedFormlyModule],
  declarations: [ModalCreateAssociationComponent],
})
export class FrontendFeatureSchoolCreateAssociationModule {}
