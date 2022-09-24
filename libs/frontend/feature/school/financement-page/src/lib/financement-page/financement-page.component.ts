import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { Component } from '@angular/core';
import { ModalService } from '@stud-asso/frontend-shared-modal';
import { TableConfiguration } from '@stud-asso/frontend-shared-table';
import { studyFinanceFormly } from './financement-page.formly';

@Component({
  selector: 'stud-asso-financement-page',
  templateUrl: './financement-page.component.html',
  styleUrls: ['./financement-page.component.scss'],
})
export class FinancementPageComponent {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Demandeur',
        size: 2,
        dataProperty: 'asso',
      },
      {
        title: 'Somme demandé',
        size: 1,
        dataProperty: 'amount',
      },
      {
        title: 'Motif',
        size: 2,
        dataProperty: 'name',
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
