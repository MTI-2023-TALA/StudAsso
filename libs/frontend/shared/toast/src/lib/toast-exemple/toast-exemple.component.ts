import { Component } from '@angular/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { ModalCreateAssociationComponent } from '@stud-asso/frontend-feature-school-create-association';
import { TableHeaderItem } from '@stud-asso/frontend-shared-table';
import { ToastService } from '../toast.service';
import { ToastType } from '../toast/toast.model';

@Component({
  selector: 'stud-asso-toast-exemple',
  templateUrl: './toast-exemple.component.html',
})
export class ToastExempleComponent {
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

  constructor(private toastService: ToastService, private modalService: ModalService) {}

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
}
