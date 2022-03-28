import { Component } from '@angular/core';
import { ModalService } from '@stud-asso/frontend/modal';
import { ModalCreateAssociationComponent } from '@stud-asso/frontend/school/create-association';
import { ToastService } from '../toast.service';
import { ToastType } from '../toast/toast.model';

@Component({
  selector: 'stud-asso-toast-exemple',
  templateUrl: './toast-exemple.component.html',
  styleUrls: ['./toast-exemple.component.scss'],
})
export class ToastExempleComponent {
  constructor(
    private toastService: ToastService,
    private modalService: ModalService
  ) {}

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
