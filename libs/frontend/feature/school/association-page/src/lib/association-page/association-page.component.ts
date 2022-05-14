import { ApiAssociationService, ApiUserService } from '@stud-asso/frontend-core-api';
import { Component, OnInit } from '@angular/core';
import { ConfirmModalComponent, ModalService } from '@stud-asso/frontend-shared-modal';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { SelectOption } from 'libs/frontend/shared/formly/src/lib/formly-select/formly-select.component';
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

  usersList: SelectOption[] = [];

  constructor(
    private apiAssociation: ApiAssociationService,
    private apiUser: ApiUserService,
    private modal: ModalService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.apiAssociation.findAll().subscribe((associations: any) => {
      this.associationList = associations;
    });
    this.usersList = this.apiUser.getEmailAndId().map((user) => ({
      label: user.email,
      value: user.id.toString(),
    }));
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

  async createModalAssociation() {
    this.modal.createForm({
      title: 'Créer une association',
      fields: (await createAssociationFormly(this.usersList)) as FormlyFieldConfig[],
      submit: this.createAssociation(),
    });
  }

  async modifyModalAssociation(id: number) {
    this.modal.createForm({
      title: 'Modifier une association',
      fields: (await createAssociationFormly(this.usersList)) as FormlyFieldConfig[],
      submit: this.modifyAssociation(id),
    });
  }

  createAssociation() {
    return (model: any) => {
      const dto = { ...model, presidentId: +model.presidentId };
      this.apiAssociation.create(dto).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Association créée', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  deleteAssociation(id: number) {
    this.apiAssociation.remove(id).subscribe({ complete: () => this.reloadData() });
  }

  modifyAssociation(id: number) {
    return (model: any) => {
      this.apiAssociation.update(id, model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Nom de l'association modifier`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  createConfirmModal() {
    this.modal.createModal(ConfirmModalComponent, {
      message: "Etes vous sur de voulour supprimer l'association Drama ?",
    });
  }
}
