import { ICreateFinanceFormly, createFinanceFormly } from './finance-page.formly';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { Component } from '@angular/core';
import { LocalStorageHelper } from '@stud-asso/frontend-core-storage';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-financement-page',
  templateUrl: './financement-page.component.html',
  styleUrls: ['./financement-page.component.scss'],
})
export class FinancementPageComponent {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Demande de financement',
        size: 2,
        dataProperty: 'name',
      },
      {
        title: 'Somme demandé',
        size: 2,
        dataProperty: 'amount',
      },
      {
        title: 'Status',
        size: 2,
        dataProperty: 'amount',
      },
    ],
    actions: [
      {
        label: 'Supprimer',
        action: (data: { id: number; name: string }) => {
          this.deleteModalFinance(data.id, data.name);
        },
      },
    ],
  };
  financeList = [];

  isLoading = true;

  constructor(private modal: ModalService, private toast: ToastService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;

    /*
    this.api.findAll().subscribe((events: EventDto[]) => {
      this.eventList = events.map((event) => ({ ...event, date: new Date(event.date).toLocaleDateString() }));
      this.isLoading = false;
    });
    */
    this.isLoading = false;
  }

  handleError() {
    return () =>
      this.toast.addAlert({
        title: 'Erreur lors de la récupération des demandes de financements',
        type: ToastType.Error,
      });
  }

  createModalFinance() {
    this.modal.createForm({
      title: 'Créer une nouvelle demande de financement',
      submitBtnText: 'Créer',
      fields: createFinanceFormly(),
      submit: this.createFinance(),
    });
  }

  createFinance() {
    return (model: ICreateFinanceFormly) => {
      const assoId = LocalStorageHelper.getData<number>('asso-id');
      if (!assoId) {
        this.toast.addAlert({ title: 'Association non trouvée', type: ToastType.Error });
        return;
      }

      /*
      const payload = { ...model, date: new Date(model.date), associationId: assoId };
      this.api.create(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Evénement créé', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
      */
    };
  }

  deleteModalFinance(id: number, name: string) {
    this.modal.createConfirmModal({
      message: `Voulez-vous vraiment supprimer la demande de financement ${name} ?`,
      submit: () => {
        this.deleteFinance(id);
      },
    });
  }

  deleteFinance(id: number) {
    /*
    this.api.remove(id).subscribe({
      complete: () => {
        this.toast.addAlert({ title: 'Evénement supprimé', type: ToastType.Success });
        this.reloadData();
      },
    });
    */
  }
}
