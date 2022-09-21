import {
  AddRoleToUserDto,
  AssociationDto,
  AssociationMemberWithRoleDto,
  UserIdAndEmailDto,
} from '@stud-asso/shared/dtos';
import { ApiAssociationService, ApiRoleService, ApiUserService } from '@stud-asso/frontend-core-api';
import { Component, OnInit } from '@angular/core';
import { ICreateMemberFormly, createMemberFormly } from './member-page.formly';
import { LocalStorageHelper, LocalStorageKey } from '@stud-asso/frontend-core-storage';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { SelectOption } from '@stud-asso/frontend-shared-formly';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-member-page',
  templateUrl: './member-page.component.html',
})
export class MemberPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Mail',
        dataProperty: 'firstname',
        size: 1,
      },
      {
        title: 'Role',
        dataProperty: 'roleName',
        size: 2,
      },
    ],
    actions: [],
  };

  isLoading = true;
  usersList: SelectOption[] = [];
  rolesList: SelectOption[] = [];
  membersList: AssociationMemberWithRoleDto[] = [];

  constructor(
    private modal: ModalService,
    private toast: ToastService,
    private apiUser: ApiUserService,
    private apiRole: ApiRoleService,
    private apiAssociation: ApiAssociationService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.isLoading = true;

    Promise.all([
      this.apiRole.findAllRoleWithAsso().subscribe((roles: AssociationDto[]) => {
        this.rolesList = roles.map((role) => ({ label: role.name, value: role.id.toString() }));
      }),
      this.apiUser.getIdAndEmail().subscribe((users: UserIdAndEmailDto[]) => {
        this.usersList = users.map((user) => ({ label: user.email, value: user.id.toString() }));
      }),
      this.apiAssociation.findMembers().subscribe((members: AssociationMemberWithRoleDto[]) => {
        this.membersList = members;
      }),
    ]).finally(() => (this.isLoading = false));
  }

  createMember(): (data: ICreateMemberFormly) => void {
    return (data: ICreateMemberFormly) => {
      const payload: AddRoleToUserDto = { userId: +data.userId, roleId: +data.roleId };
      this.apiRole.addRoleToUser(payload).subscribe(() => {
        this.toast.addAlert({ title: 'Membre ajouté', type: ToastType.Success });
        this.reloadData();
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
}
