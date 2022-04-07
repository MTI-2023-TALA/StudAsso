import { Component } from '@angular/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

enum Action {
  EDIT = 1,
  DELETE = 2,
}

@Component({
  selector: 'stud-asso-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss'],
})
export class MembersListComponent {
  tableConfiguration: TableConfiguration = {
    columns: [
      { title: 'Avatar', size: 1, dataProperty: 'name' },
      { title: 'Login', size: 3, dataProperty: 'name' },
      { title: 'Rôle(s)', size: 2, dataProperty: 'name' },
    ],
    actions: [
      { label: 'Modifier', action: Action.EDIT, dataProperty: 'id' },
      {
        label: 'Supprimer',
        action: Action.DELETE,
        dataProperty: 'id',
      },
    ],
  };

  membersList: any[] = [];

  constructor(private modal: ModalService, private toast: ToastService) {
    return;
  }

  handleError() {
    return () => this.toast.addAlert({ title: 'Erreur lors de la récupération des membres', type: ToastType.Error });
  }
}
