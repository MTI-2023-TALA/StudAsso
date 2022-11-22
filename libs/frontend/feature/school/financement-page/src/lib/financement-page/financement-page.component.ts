import { Component, OnInit } from '@angular/core';
import { FundingDto, PAGINATION_BASE_LIMIT, PAGINATION_BASE_OFFSET } from '@stud-asso/shared/dtos';
import { IUpdateFinanceFormly, studyFinanceFormly } from './financement-page.formly';
import { Pagination, TableConfiguration, TableTagListComponent } from '@stud-asso/frontend-shared-table';
import { Tag, TagType } from '@stud-asso/frontend-shared-tag';
import { ToastService, ToastType } from '@stud-asso/frontend-shared-toast';

import { ApiFundingService } from '@stud-asso/frontend-core-api';
import { ModalService } from '@stud-asso/frontend-shared-modal';

type Funding = Omit<FundingDto, 'status' | 'createdAt'> & {
  status: Tag;
  createdAt: string;
};
@Component({
  selector: 'stud-asso-financement-page',
  templateUrl: './financement-page.component.html',
})
export class FinancementPageComponent implements OnInit {
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        title: 'Demandeur',
        size: 1,
        dataProperty: 'association',
      },
      {
        title: 'Intitulé de la demande',
        size: 1,
        dataProperty: 'name',
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
      {
        title: 'Statut',
        size: 1,
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
        shouldShow: true,
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
    this.reloadData(this.pagination);
  }

  reloadData(pagination: Pagination) {
    this.isLoading = true;
    this.api.findAll(pagination).subscribe((fundings: FundingDto[]) => {
      this.financeList = fundings.map((funding) => ({
        ...funding,
        createdAt: new Date(funding.createdAt).toLocaleDateString(),
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

  studyModalFinance(id: number) {
    this.api.find(id).subscribe((funding) => {
      this.modal.createForm({
        title: `Etude de la demande de financement ${funding.name}`,
        fields: studyFinanceFormly(funding.name, funding.amount, funding.motivation),
        submitBtnText: 'Envoyer',
        submit: this.acceptFinance(id),
      });
    });
  }

  acceptFinance(id: number) {
    return (model: IUpdateFinanceFormly) => {
      const payload = { status: model.status, schoolComment: model.schoolComment };
      this.api.update(id, payload).subscribe({
        complete: () => {
          this.toast.addAlert({ title: `Modification effectuée`, type: ToastType.Success });
          this.reloadData(this.pagination);
        },
        error: this.handleError(),
      });
    };
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
