import { Component, OnInit } from '@angular/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { ModalCreateAssociationComponent } from '@stud-asso/frontend-feature-school-create-association';
import { TableHeaderItem } from '@stud-asso/frontend-shared-table';
import { ToastService } from '../toast.service';
import { ToastType } from '../toast/toast.model';
import { ApiAssociationService } from '@stud-asso/frontend-core-api';

@Component({
  selector: 'stud-asso-toast-exemple',
  templateUrl: './toast-exemple.component.html',
})
export class ToastExempleComponent implements OnInit {
  testTableHeader: TableHeaderItem[] = [
    {
      label: 'Association',
      size: 1,
    },
    {
      label: 'Nom du président',
      size: 2,
    },
    {
      label: 'Actions',
      size: 1,
    },
  ];

  associationList: any[] = [];

  constructor(
    private toastService: ToastService,
    private modalService: ModalService,
    private apiAssociationService: ApiAssociationService
  ) {}

  ngOnInit() {
    this.apiAssociationService.findAll().subscribe((res) => {
      this.associationList = res as any;
      console.log(this.associationList);
    });
    return;
  }

  addAlert(toastType: string) {
    this.toastService.addAlert({
      title: 'Test',
      subTitle: 'Other',
      type: toastType as ToastType,
    });
    return;
  }

  createModal() {
    this.modalService.createModal(ModalCreateAssociationComponent);
  }

  createAssociation() {
    this.apiAssociationService.create({ name: 'Ok' }).subscribe({
      complete: () => {
        this.toastService.addAlert({
          title: 'Nouvelle Association ajoutée',
          subTitle: '',
          type: ToastType.Success,
        });
      },
      error: () => {
        this.toastService.addAlert({
          title: 'Une erreur est survenue !',
          subTitle: '',
          type: ToastType.Error,
        });
      },
    });
    return;
  }
}
