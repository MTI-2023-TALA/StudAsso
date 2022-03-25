import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalCreateAssociationComponent } from './modal-create-association/modal-create-association.component';
import { FrontendFormlyModule } from '@stud-asso/frontend/formly';

@NgModule({
  imports: [CommonModule, FrontendFormlyModule],
  declarations: [ModalCreateAssociationComponent],
})
export class FrontendSchoolCreateAssociationModule {}
