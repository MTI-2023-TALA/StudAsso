import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiAssociationService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { createAssociationFormly } from './association-page.formly';

enum Action {
  EDIT = 1,
  DELETE = 2,
}

@Component({
  selector: 'stud-asso-association-page',
  templateUrl: './association-page.component.html',
  styleUrls: ['./association-page.component.scss'],
})
export class AssociationPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Association',
        size: 2,
        dataProperty: 'name',
      },
    ],
    actions: [
      {
        label: 'Modifier',
        action: Action.EDIT,
        dataProperty: 'id',
      },
      {
        label: 'Supprimer',
        action: Action.DELETE,
        dataProperty: 'id',
      },
    ],
  };

  associationList: any[] = [];

  constructor(private api: ApiAssociationService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.api.findAll().subscribe((associations: any) => {
      this.associationList = associations;
    });
  }

  handleError() {
    return () =>
      this.toast.addAlert({ title: 'Erreur lors de la récupération des associations', type: ToastType.Error });
  }

  handleTableEvent(event: { action: number; data: any }) {
    switch (event.action) {
      case Action.EDIT:
        this.modifyModalAssociation(event.data);
        break;
      case Action.DELETE:
        this.deleteAssociation(event.data);
        break;
    }
  }

  createModalAssociation() {
    this.modal.createForm({
      title: 'Créer une association',
      fields: createAssociationFormly,
      submit: this.createAssociation(),
    });
  }

  modifyModalAssociation(id: number) {
    this.modal.createForm({
      title: 'Modifier une association',
      fields: createAssociationFormly,
      submit: this.modifiAssociation(id),
    });
  }

  createAssociation() {
    return (model: any) => {
      this.api.create(model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Association créer', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  deleteAssociation(id: number) {
    this.api.remove(id).subscribe({ complete: () => this.reloadData() });
  }

  modifiAssociation(id: number) {
    return (model: any) => {
      this.api.update(id, model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Nom de l'association modifier`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
