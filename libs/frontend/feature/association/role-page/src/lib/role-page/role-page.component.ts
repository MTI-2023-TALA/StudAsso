import { ApiAssociationService, ApiRoleService } from '@stud-asso/frontend-core-api';
import { Component, OnInit } from '@angular/core';
import { ICreateRoleFormly, createRoleFormly } from './role-page.formly';
import { PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET, RoleDto } from '@stud-asso/shared/dtos';
import { Pagination, TableConfiguration, TableTagListComponent } from '@stud-asso/frontend-shared-table';
import { PermissionColor, PermissionId, permissions } from '@stud-asso/shared/permission';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

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
        action: (data: Role) => {
          this.modifyModalRole(data);
        },
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

  constructor(
    private apiAssociation: ApiAssociationService,
    private api: ApiRoleService,
    private modal: ModalService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.reloadData(this.pagination);
  }

  reloadData(pagination: Pagination) {
    this.isLoading = true;

    this.api.findAllRoleWithAsso(pagination).subscribe((roles: RoleDto[]) => {
      this.roleList = roles.map((role) => ({
        ...role,
        permissions:
          role.name === 'Président'
            ? [{ type: PermissionColor.INFORMATION, message: 'Toutes les permissions' }]
            : role.permissions.map((permission) => {
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

  modifyModalRole(role: Role) {
    if (role.name === 'Président') {
      this.toast.addAlert({ title: 'Impossible de modifier le rôle Président', type: ToastType.Error });
      return;
    }
    this.modal.createForm({
      title: 'Modifier un rôle',
      fields: createRoleFormly(role.name),
      submitBtnText: 'Modifier',
      submit: this.modifyRole(role.id),
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

  async deleteModalRole(id: number, name: string) {
    if (name === 'Président') {
      this.toast.addAlert({ title: 'Impossible de supprimer le rôle Président', type: ToastType.Error });
      return;
    }
    await this.apiAssociation.findMembers({ limit: 10000, offset: 0 }).subscribe((members) => {
      const membersWithRole = members.filter((member) => member.roleId === id);
      let removeMembers = '';
      if (membersWithRole.length > 0) {
        removeMembers += '⚠ Cela va exclure les members suivants : ';
        membersWithRole.forEach((member) => {
          removeMembers += `${member.userEmail} `;
        });
      }

      this.modal.createConfirmModal({
        message: `Voulez-vous vraiment supprimer le rôle ${name} ? ${removeMembers}`,
        submit: () => {
          this.deleteRole(id);
        },
      });
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
