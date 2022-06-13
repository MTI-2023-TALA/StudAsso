import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiRoleService } from '@stud-asso/frontend-core-api';
import { AssociationDto } from '@stud-asso/shared/dtos';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { createRoleFormly } from './role-page.formly';
import { getData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-role-page',
  templateUrl: './role-page.component.html',
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
        action: (data: number) => {
          this.modifyModalRole(data);
        },
        dataProperty: 'id',
      },
      {
        label: 'Supprimer',
        action: (data: number) => {
          this.deleteRole(data);
        },
        dataProperty: 'id',
      },
    ],
  };

  roleList: AssociationDto[] = [];

  isLoading = true;

  constructor(private api: ApiRoleService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;

    const assoIdData = getData('asso-id');
    if (!assoIdData) {
      this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
      return;
    }

    const associationId = JSON.parse(assoIdData);
    this.api.findAllRoleWithAsso(associationId).subscribe((roles: AssociationDto[]) => {
      this.roleList = roles;
      this.isLoading = false;
    });
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des rôles', type: ToastType.Error });
  }

  createModalRole() {
    this.modal.createForm({
      title: 'Créer un nouveau rôle',
      fields: createRoleFormly,
      submit: this.createRole(),
    });
  }

  modifyModalRole(id: number) {
    this.modal.createForm({
      title: 'Modifier un rôle',
      fields: createRoleFormly,
      submit: this.modifyRole(id),
    });
  }

  createRole() {
    return (model: any) => {
      const assoIdData = getData('asso-id');
      if (!assoIdData) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }
      const associationId = JSON.parse(assoIdData);

      const payload = { ...model, associationId };
      this.api.create(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Rôle créé', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  deleteRole(id: number) {
    this.api.remove(id).subscribe({
      complete: () => {
        this.toast.addAlert({ title: 'Rôle supprimé', type: ToastType.Success });
        this.reloadData();
      },
    });
  }

  modifyRole(id: number) {
    return (model: any) => {
      this.api.update(id, model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Nom du rôle modifié`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
