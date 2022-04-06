import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseModalComponent } from '@stud-asso/frontend-shared-modal';
import { UseStorageUnoptimized } from '@stud-asso/frontend-core-storage';
import { ModalCreateAssociationFormly } from './modal-create-association.formly';

@Component({
  selector: 'stud-asso-modal-create-association',
  templateUrl: './modal-create-association.component.html',
})
export class ModalCreateAssociationComponent extends BaseModalComponent {
  form = new FormGroup({});
  @UseStorageUnoptimized('form:test') model = {};
  fields = ModalCreateAssociationFormly.getForm();

  constructor() {
    super();
    return;
  }

  public onSubmit(model: any): void {
    return;
  }
}
