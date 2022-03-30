import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseModalComponent } from '@stud-asso/frontend/modal';
import { UseStorageForm } from '@stud-asso/frontend/storage';
import { ModalCreateAssociationFormly } from './modal-create-association.formly';

@Component({
  selector: 'stud-asso-modal-create-association',
  templateUrl: './modal-create-association.component.html',
  styleUrls: ['./modal-create-association.component.scss'],
})
export class ModalCreateAssociationComponent extends BaseModalComponent {
  form = new FormGroup({});
  @UseStorageForm('form:createAssociation') model = {};
  fields = ModalCreateAssociationFormly.getForm();

  constructor() {
    super();
    return;
  }

  public onSubmit(model: any): void {
    return;
  }
}
