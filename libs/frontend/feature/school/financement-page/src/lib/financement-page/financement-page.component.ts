import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiFundingService } from '@stud-asso/frontend-core-api';
import { Component } from '@angular/core';
import { FundingDto } from '@stud-asso/shared/dtos';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { studyFinanceFormly } from './financement-page.formly';

export type Funding = Omit<FundingDto, 'createdAt'> & { createdAt: string };
@Component({
  selector: 'stud-asso-financement-page',
  templateUrl: './financement-page.component.html',
})
export class FinancementPageComponent {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Demandeur',
        size: 1,
        dataProperty: 'id',
      },
      {
        title: 'Somme demandé',
        size: 1,
        dataProperty: 'amount',
      },
      {
        title: 'Date de la demande',
        size: 1,
        dataProperty: 'createdAt',
      },
    ],
    actions: [
      {
        label: 'Etudier',
        action: (data: { id: number; name: string }) => {
          this.studyModalFinance(data.id, data.name);
        },
      },
    ],
  };
  financeList: Funding[] = [];

  isLoading = true;

  constructor(private modal: ModalService, private toast: ToastService, private api: ApiFundingService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;
    this.api.findAll().subscribe((fundings: FundingDto[]) => {
      this.financeList = fundings.map((funding) => ({
        ...funding,
        createdAt: new Date(funding.createdAt).toLocaleDateString(),
      }));
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

  studyModalFinance(id: number, name: string) {
    this.modal.createForm({
      title: 'Etude de la demande de financement ${name}',
      fields: studyFinanceFormly(),
      submitBtnText: 'Accepter',
      submit: () => {
        this.acceptFinance(id);
      },
    });
  }

  acceptFinance(id: number) {
    /*
  Change status to accepted
    },
  });
  */
  }
}
