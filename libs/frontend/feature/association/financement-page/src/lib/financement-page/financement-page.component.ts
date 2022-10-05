import { Component, OnInit } from '@angular/core';
import { ICreateFinanceFormly, createFinanceFormly, studyFinanceFormly } from './financement-page.formly';
import { TableConfiguration, TableTagListComponent } from '@stud-asso/frontend-shared-table';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiFundingService } from '@stud-asso/frontend-core-api';
import { FundingDto } from '@stud-asso/shared/dtos';
import { ModalService } from '@stud-asso/frontend-shared-modal';

@Component({
  selector: 'stud-asso-financement-page',
  templateUrl: './financement-page.component.html',
})
export class FinancementPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Intitulé',
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
        dataProperty: 'status',
        dataViewComponent: TableTagListComponent,
      },
    ],
    actions: [
      {
        label: 'Etudier',
        action: (data: number) => {
          this.studyModalFinance(data);
        },
        dataProperty: 'id',
      },
    ],
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

  studyModalFinance(id: number) {
    this.api.find(id).subscribe((funding) => {
      this.modal.createForm({
        title: `Etude de la demande de financement ${funding.name}`,
        fields: studyFinanceFormly(funding.name, funding.amount, funding.motivation, funding.schoolComment),
      });
    });
  }
}
