import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { createRoleFormly } from './role-page.formly';

enum Action {
  EDIT = 1,
  DELETE = 2,
}

@Component({
  selector: 'stud-asso-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss'],
})
export class RolePageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Rôle',
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

  roleList: any[] = [];

  constructor(private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    console.log('todo');
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des rôles', type: ToastType.Error });
  }

  handleTableEvent(event: { action: number; data: any }) {
    switch (event.action) {
      case Action.EDIT:
        this.modifyModalRole(event.data);
        break;
      case Action.DELETE:
        this.deleteRole(event.data);
        break;
    }
  }

  createModalRole() {
    this.modal.createForm({
      title: 'Créer un nouveau rôle',
      fields: createRoleFormly,
      //submit: this.createRole(),
    });
  }

  modifyModalRole(id: number) {
    this.modal.createForm({
      title: 'Modifier un rôle',
      fields: createRoleFormly,
      //submit: this.modifyRole(id),
    });
  }

  createRole() {
    console.log('Todo');
  }

  deleteRole(id: number) {
    console.log('Todo');
  }

  modifyRole(id: number) {
    console.log('Todo');
  }
}
