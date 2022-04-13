import { CommonModule } from '@angular/common';
import { FrontendSharedFormlyModule } from '@stud-asso/frontend-shared-formly';
import { ModalCreateAssociationComponent } from './modal-create-association/modal-create-association.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FrontendSharedFormlyModule],
  declarations: [ModalCreateAssociationComponent],
})
export class FrontendFeatureSchoolCreateAssociationModule {}
