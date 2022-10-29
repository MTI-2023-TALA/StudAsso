import {
  AddRoleToUserDto,
  AssociationDto,
  AssociationMemberWithRoleDto,
  PAGINATION_BASE_LIMIT,
  PAGINATION_BASE_OFFSET,
  UserIdAndEmailDto,
} from '@stud-asso/shared/dtos';
import { ApiAssociationService, ApiRoleService, ApiUserService } from '@stud-asso/frontend-core-api';
import { Component, OnInit } from '@angular/core';
import {
  ICreateMemberFormly,
  IUpdateMemberRoleFormly,
  createMemberFormly,
  updateMemberRoleFormly,
} from './member-page.formly';
import { Pagination, TableConfiguration } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { SelectOption } from '@stud-asso/frontend-shared-formly';

export type AssociationMember = AssociationMemberWithRoleDto & { identity: string };

@Component({
  selector: 'stud-asso-member-page',
  templateUrl: './member-page.component.html',
})
export class MemberPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Nom',
        dataProperty: 'identity',
        size: 1,
      },
      {
        title: 'Role',
        dataProperty: 'roleName',
        size: 2,
      },
    ],
    actions: [
      {
        label: 'Modifier le role',
        action: (member: AssociationMember) => {
          this.createModalUpdateRoleMember(member);
        },
      },
      {
        label: "Exclure de l'association",
        action: (member: AssociationMember) => {
          this.createModalRemoveMember(member);
        },
      },
    ],
  };

  isLoading = true;
  usersList: SelectOption[] = [];
  rolesList: SelectOption[] = [];
  membersList: AssociationMember[] = [];
  pagination: Pagination = { limit: PAGINATION_BASE_LIMIT, offset: PAGINATION_BASE_OFFSET };

  constructor(
    private modal: ModalService,
    private toast: ToastService,
    private apiUser: ApiUserService,
    private apiRole: ApiRoleService,
    private apiAssociation: ApiAssociationService
  ) {}

  ngOnInit(): void {
    this.reloadData(this.pagination);
  }

  onUpdatePagination(pagination: Pagination): void {
    this.pagination = pagination;
    this.reloadData(pagination);
  }

  reloadData(pagination: Pagination): void {
    this.isLoading = true;

    Promise.all([
      this.apiRole.findAllRoleWithAsso().subscribe((roles: AssociationDto[]) => {
        this.rolesList = roles.map((role) => ({ label: role.name, value: role.id.toString() }));
      }),
      this.apiUser.getIdAndEmail().subscribe((users: UserIdAndEmailDto[]) => {
        this.usersList = users.map((user) => ({ label: user.email, value: user.id.toString() }));
      }),
      this.apiAssociation.findMembers(pagination).subscribe((members: AssociationMemberWithRoleDto[]) => {
        this.membersList = members.map((member) => ({
          ...member,
          identity: `${member.userFullName} <${member.userEmail}>`,
        }));
      }),
    ]).finally(() => (this.isLoading = false));
  }

  createMember(): (data: ICreateMemberFormly) => void {
    return (data: ICreateMemberFormly) => {
      const payload: AddRoleToUserDto = { userId: +data.userId, roleId: +data.roleId };
      this.apiRole.addRoleToUser(payload).subscribe(() => {
        this.toast.addAlert({ title: 'Membre ajouté', type: ToastType.Success });
        this.reloadData(this.pagination);
      });
    };
  }

  async createModalMember() {
    this.modal.createForm({
      title: "Ajout d'un membre",
      fields: (await createMemberFormly(this.usersList, this.rolesList)) as FormlyFieldConfig[],
      submitBtnText: 'Ajouter',
      submit: this.createMember(),
    });
  }

  createModalRemoveMember(member: AssociationMember): void {
    if (member.roleName === 'Président') {
      this.toast.addAlert({ title: "Le président ne peut pas être exclu de l'association", type: ToastType.Error });
      return;
    }
    this.modal.createConfirmModal({
      message: `Êtes-vous sûr de vouloir exclure ${member.userFullName} <${member.userEmail}> de l'association ?`,
      submit: () => {
        this.removeMemberFromAssociation(member.id);
      },
    });
  }

  removeMemberFromAssociation(id: number) {
    this.apiAssociation.deleteUserFromAsso(id).subscribe(() => {
      this.toast.addAlert({ title: 'Membre exclu', type: ToastType.Success });
      this.reloadData(this.pagination);
    });
  }

  createModalUpdateRoleMember(member: AssociationMember) {
    if (member.roleName === 'Président') {
      this.toast.addAlert({ title: 'Le président ne peut pas changer de rôle', type: ToastType.Error });
      return;
    }
    this.modal.createForm({
      title: `Modification du role de ${member.userFullName} <${member.userEmail}>`,
      fields: updateMemberRoleFormly(this.rolesList, member),
      submit: (model: IUpdateMemberRoleFormly) => {
        this.updateMemberRole(member.id, +model.roleId);
      },
      submitBtnText: 'Modifier',
    });
  }

  updateMemberRole(userId: number, roleId: number) {
    this.apiRole.addRoleToUser({ userId, roleId }).subscribe(() => {
      this.toast.addAlert({ title: 'Role modifié', type: ToastType.Success });
      this.reloadData(this.pagination);
    });
  }
}
