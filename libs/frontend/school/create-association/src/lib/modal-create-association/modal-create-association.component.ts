import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalCreateAssociationFormly } from './modal-create-association.formly';

@Component({
  selector: 'stud-asso-modal-create-association',
  templateUrl: './modal-create-association.component.html',
  styleUrls: ['./modal-create-association.component.scss'],
})
export class ModalCreateAssociationComponent {
  public form = new FormGroup({});
  public model = {};
  public fields = ModalCreateAssociationFormly.getForm();

  constructor() {
    return;
  }

  public onSubmit(model: any): void {
    return;
  }
}
