import { ICreateFinanceFormly, createFinanceFormly } from './finance-page.formly';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiFundingService } from '@stud-asso/frontend-core-api';
import { Component } from '@angular/core';
import { FundingDto } from '@stud-asso/shared/dtos';
import { LocalStorageHelper } from '@stud-asso/frontend-core-storage';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';

@Component({
  selector: 'stud-asso-financement-page',
  templateUrl: './financement-page.component.html',
})
export class FinancementPageComponent {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Somme demandé',
        size: 2,
        dataProperty: 'amount',
      },
      {
        title: 'Status',
        size: 2,
        dataProperty: 'status',
      },
    ],
    actions: [],
  };
  financeList: FundingDto[] = [];

  isLoading = true;

  constructor(private modal: ModalService, private toast: ToastService, private api: ApiFundingService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;
    this.api.findAll().subscribe((fundings: FundingDto[]) => {
      this.financeList = fundings;
      this.isLoading = false;
    });
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

      const payload = { ...model };
      this.api.createFunding(payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: 'Demande de financement créé', type: ToastType.Success });
          this.reloadData();
        },
        error: this.handleError(),
      });
    };
  }
}
