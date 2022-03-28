import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseModalComponent } from '@stud-asso/frontend/modal';
import { ModalCreateAssociationFormly } from './modal-create-association.formly';

@Component({
  selector: 'stud-asso-modal-create-association',
  templateUrl: './modal-create-association.component.html',
  styleUrls: ['./modal-create-association.component.scss'],
})
export class ModalCreateAssociationComponent extends BaseModalComponent {
  public form = new FormGroup({});
  public model = {};
  public fields = ModalCreateAssociationFormly.getForm();

  constructor() {
    super();
    return;
  }

  public onSubmit(model: any): void {
    return;
  }
}
