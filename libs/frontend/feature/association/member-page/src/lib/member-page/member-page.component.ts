import { ApiRoleService, ApiUserService } from '@stud-asso/frontend-core-api';
import { AssociationDto, UserIdAndEmailDto } from '@stud-asso/shared/dtos';
import { Component, OnInit } from '@angular/core';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { SelectOption } from '@stud-asso/frontend-shared-formly';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { createMemberFormly } from './member-page.formly';
import { getData } from '@stud-asso/frontend-core-storage';

@Component({
  selector: 'stud-asso-member-page',
  templateUrl: './member-page.component.html',
})
export class MemberPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Mail',
        dataProperty: 'id',
        size: 1,
      },
      {
        title: 'Role',
        dataProperty: 'content',
        size: 2,
      },
    ],
    actions: [],
  };

  isLoading = true;
  usersList: SelectOption[] = [];
  rolesList: SelectOption[] = [];
  membersList = [];

  constructor(
    private modal: ModalService,
    private toast: ToastService,
    private apiUser: ApiUserService,
    private apiRole: ApiRoleService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData(): void {
    this.isLoading = true;
    const assoIdData = getData('asso-id');
    if (!assoIdData) {
      this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
      return;
    }

    const associationId = JSON.parse(assoIdData);
    Promise.all([
      this.apiRole.findAllRoleWithAsso(associationId).subscribe((roles: AssociationDto[]) => {
        this.rolesList = roles.map((role) => ({ label: role.name, value: role.id.toString() }));
      }),
      this.apiUser.getIdAndEmail().subscribe((users: UserIdAndEmailDto[]) => {
        this.usersList = users.map((user) => ({ label: user.email, value: user.id.toString() }));
      }),
    ]).finally(() => (this.isLoading = false));
  }

  createMember(): (data: any) => void {
    return (data: any) => {
      // TODO: Fix when backend is correctly setup !
      const assoId = getData('asso-id');
      if (!assoId) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }
      const associationId = JSON.parse(assoId);
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
