import { Component, OnInit } from '@angular/core';
import { ApiAssociationService } from '@stud-asso/frontend-core-api';
import { Form } from '@stud-asso/frontend-shared-formly';
import { FormModalComponent, ModalService } from '@stud-asso/frontend-shared-modal';
import { TableHeaderItem } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

@Component({
  selector: 'stud-asso-association-page',
  templateUrl: './association-page.component.html',
  styleUrls: ['./association-page.component.scss'],
})
export class AssociationPageComponent implements OnInit {
  headerList: TableHeaderItem[] = [
    {
      label: 'Association',
      size: 2,
    },
  ];

  associationList: any[] = [];

  constructor(private api: ApiAssociationService, private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  handleError() {
    return () =>
      this.toast.addAlert({ title: 'Erreur lors de la récupération des associations', type: ToastType.Error });
  }

  reloadData() {
    this.api.findAll().subscribe((associations) => {
      this.associationList = associations as any;
    });
  }

  createModalAssociation() {
    this.modal.createModal(FormModalComponent, {
      title: 'Créer une association',
      fields: [
        {
          key: 'name',
          type: Form.Input,
          templateOptions: {
            label: `Nom de l'association`,
            placeholder: `Nom de l'association`,
            required: true,
          },
        },
      ],
      submit: this.createAssociation(),
    });
  }

  createAssociation() {
    return (model: any) => {
      this.api.create(model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Association créer', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  modifyModalAssociation(id: number) {
    this.modal.createModal(FormModalComponent, {
      title: 'Modifier une association',
      fields: [
        {
          key: 'name',
          type: Form.Input,
          templateOptions: {
            label: `Nom de l'association`,
            placeholder: `Nom de l'association`,
            required: true,
          },
        },
      ],
      submit: this.modifiAssociation(id),
    });
    return;
  }

  modifiAssociation(id: number) {
    return (model: any) => {
      this.api.update(id, model).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Nom de l'association créer`, type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }

  deleteModalAssociation(id: number) {
    this.api.remove(id).subscribe({ complete: () => this.reloadData() });
    return;
  }
}
