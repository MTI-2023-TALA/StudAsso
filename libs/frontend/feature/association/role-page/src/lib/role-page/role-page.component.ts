import { Component, OnInit } from '@angular/core';
import { ICreateRoleFormly, createRoleFormly } from './role-page.formly';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiRoleService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { RoleDto } from '@stud-asso/shared/dtos';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

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
        action: (data: { id: number; name: string }) => {
          this.deleteModalRole(data.id, data.name);
        },
      },
    ],
  };

  roleList: RoleDto[] = [];

  isLoading = true;

  constructor(private api: ApiRoleService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;

    this.api.findAllRoleWithAsso().subscribe((roles: RoleDto[]) => {
      this.roleList = roles;
      this.isLoading = false;
    });
  }

  getSpecificRole(id: number): RoleDto | null {
    for (const role of this.roleList) {
      if (role.id == id) {
        return role;
      }
    }
    return null;
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des rôles', type: ToastType.Error });
  }

  createModalRole() {
    this.modal.createForm({
      title: 'Créer un nouveau rôle',
      submitBtnText: 'Créer',
      fields: createRoleFormly(),
      submit: this.createRole(),
    });
  }

  modifyModalRole(id: number) {
    const role = this.getSpecificRole(id);
    this.modal.createForm({
      title: 'Modifier un rôle',
      fields: createRoleFormly(role?.name),
      submitBtnText: 'Modifier',
      submit: this.modifyRole(id),
    });
  }

  createRole() {
    return (model: ICreateRoleFormly) => {
      const assoId = LocalStorageHelper.getData<number>(LocalStorageKey.ASSOCIATION_ID);
      if (!assoId) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }

      const payload = { ...model, associationId: assoId };
      this.api.create(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Rôle créé', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  deleteModalRole(id: number, name: string) {
    this.modal.createConfirmModal({
      message: `Voulez-vous vraiment supprimer le rôle ${name} ?`,
      submit: () => {
        this.deleteRole(id);
      },
    });
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
    return (model: ICreateRoleFormly) => {
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
