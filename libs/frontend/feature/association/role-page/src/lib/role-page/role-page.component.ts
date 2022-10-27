import { Component, OnInit } from '@angular/core';
import { ICreateRoleFormly, createRoleFormly } from './role-page.formly';
import { PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET, RoleDto } from '@stud-asso/shared/dtos';
import { Pagination, TableConfiguration, TableTagListComponent } from '@stud-asso/frontend-shared-table';
import { PermissionId, permissions } from '@stud-asso/shared/permission';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiRoleService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { Tag } from '@stud-asso/frontend-shared-tag';

type Role = Omit<RoleDto, 'permissions'> & { permissions: Tag[] };

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
      {
        title: 'Permissions',
        size: 2,
        dataProperty: 'permissions',
        dataViewComponent: TableTagListComponent,
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

  roleList: Role[] = [];
  pagination: Pagination = {
    limit: PAGINATION_BASE_LIMIT,
    offset: PAGINATION_BASE_OFFSET,
  };

  isLoading = true;

  constructor(private api: ApiRoleService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData(this.pagination);
  }

  reloadData(pagination: Pagination) {
    this.isLoading = true;

    this.api.findAllRoleWithAsso(pagination).subscribe((roles: RoleDto[]) => {
      this.roleList = roles.map((role) => ({
        ...role,
        permissions: role.permissions.map((permission) => {
          return { type: permissions[permission].color, message: permissions[permission].name };
        }),
      }));
      this.isLoading = false;
    });
  }

  onUpdatePagination(newPagination: Pagination) {
    this.pagination = newPagination;
    this.reloadData(this.pagination);
  }

  getSpecificRole(id: number): Role | null {
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
      const payload = {
        ...model,
        permissions: model.permissions.map((option) => {
          return option.value as PermissionId;
        }),
      };
      this.api.create(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Rôle créé', type: ToastType.Success });
          this.reloadData(this.pagination);
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
        this.reloadData(this.pagination);
      },
    });
  }

  modifyRole(id: number) {
    return (model: ICreateRoleFormly) => {
      const payload = {
        ...model,
        permissions: model.permissions.map((option) => {
          return option.value as PermissionId;
        }),
      };
      this.api.update(id, payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Nom du rôle modifié`, type: ToastType.Success });
          this.reloadData(this.pagination);
        },
        error: this.handleError(),
      });
    };
  }
}
