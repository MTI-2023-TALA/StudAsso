import { ApiAssociationService, ApiUserService } from '@stud-asso/frontend-core-api';
import { Component, OnInit } from '@angular/core';
import { ConfirmModalComponent, ModalService } from '@stud-asso/frontend-shared-modal';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';
import { createAssociationFormly, modifyAssociationFormly } from './association-page.formly';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { SelectOption } from '@stud-asso/frontend-shared-formly';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { UserIdAndEmailDto } from '@stud-asso/shared/dtos';

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
        action: (data: number) => {
          this.modifyModalAssociation(data);
        },
        dataProperty: 'id',
      },
      {
        label: 'Supprimer',
        action: (data: { id: number; name: string }) => {
          this.deleteModalAssociation(data.id, data.name);
        },
      },
    ],
  };

  associationList: any[] = [];

  usersList: SelectOption[] = [];

  isLoading = true;

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
    this.isLoading = true;
    Promise.all([
      this.apiAssociation.findAll().subscribe((associations: any) => {
        this.associationList = associations;
      }),
      this.apiUser.getIdAndEmail().subscribe((users: UserIdAndEmailDto[]) => {
        this.usersList = users.map((user) => ({ label: user.email, value: user.id.toString() }));
      }),
    ]).finally(() => (this.isLoading = false));
  }

  handleError() {
    return () =>
      this.toast.addAlert({ title: 'Erreur lors de la r??cup??ration des associations', type: ToastType.Error });
  }

  async createModalAssociation() {
    this.modal.createForm({
      title: 'Cr??er une association',
      submitBtnText: 'Cr??er',
      fields: (await createAssociationFormly(this.usersList)) as FormlyFieldConfig[],
      submit: this.createAssociation(),
    });
  }

  async modifyModalAssociation(id: number) {
    this.modal.createForm({
      title: 'Modifier une association',
      fields: modifyAssociationFormly,
      submitBtnText: 'Modifier',
      submit: this.modifyAssociation(id),
    });
  }

  createAssociation() {
    return (model: any) => {
      const dto = { ...model, presidentId: +model.presidentId };
      this.apiAssociation.create(dto).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Association cr????e', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  async deleteModalAssociation(id: number, name: string) {
    this.modal.createModal(ConfirmModalComponent, {
      message: `Etes vous sur de voulour supprimer l'association ${name} ?`,
      submit: () => {
        this.deleteAssociation(id);
      },
    });
  }

  deleteAssociation(id: number) {
    this.apiAssociation.remove(id).subscribe({ complete: () => this.reloadData() });
  }

  modifyAssociation(id: number) {
    return (model: any) => {
      this.apiAssociation.update(id, model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Nom de l'association modifi??e`, type: ToastType.Success });
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
