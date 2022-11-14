import { Component, OnInit } from '@angular/core';
import { FundingDto, PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';
import { ICreateFinanceFormly, createFinanceFormly, studyFinanceFormly } from './financement-page.formly';
import { Pagination, TableConfiguration, TableTagListComponent } from '@stud-asso/frontend-shared-table';
import { Tag, TagType } from '@stud-asso/frontend-shared-tag';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiFundingService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';

type Funding = Omit<FundingDto, 'status'> & { status: Tag };

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
  financeList: Funding[] = [];
  pagination: Pagination = { limit: PAGINATION_BASE_LIMIT, offset: PAGINATION_BASE_OFFSET };

  isLoading = true;

  constructor(private modal: ModalService, private toast: ToastService, private api: ApiFundingService) {}

  ngOnInit() {
    this.reloadData(this.pagination);
  }

  onUpdatePagination(pagination: Pagination) {
    this.pagination = pagination;
    this.reloadData(pagination);
  }

  reloadData(pagination: Pagination) {
    this.isLoading = true;
    this.api.findAllByAsso(pagination).subscribe((fundings: FundingDto[]) => {
      this.financeList = fundings.map((funding) => ({
        ...funding,
        status: this._getTagFromString(funding.status),
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
          this.reloadData(this.pagination);
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

  private _getTagFromString(status: string): Tag {
    switch (status) {
      case 'PENDING':
        return { type: TagType.Warning, message: 'En attente' };
      case 'APPROVED':
        return { type: TagType.Success, message: 'Approuvée' };
      case 'REJECTED':
        return { type: TagType.Error, message: 'Rejetée' };
      default:
        return { type: TagType.Default, message: status };
    }
  }
}
